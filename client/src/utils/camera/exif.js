import { TYPES, TAGS } from './assets/exif.json'

/* eslint-disable */
function insertExifRotation(jpeg) {
  const zeroth = {}

  zeroth[274] = 1 // ImageIFD.Orientation = 274

  const exifbytes = dump({ '0th': zeroth })
  const insertedjPeg = insert(exifbytes, jpeg)

  return insertedjPeg
}

function dump(exif_dict_original) {
  const exif_dict = { ...exif_dict_original }
  const header = 'Exif\x00\x00\x4d\x4d\x00\x2a\x00\x00\x00\x08'

  let zeroth_ifd

  if ('0th' in exif_dict) {
    zeroth_ifd = exif_dict['0th']
  } else {
    zeroth_ifd = {}
  }

  const zeroth_set = _dict_to_bytes(zeroth_ifd, '0th', 0)

  const exif_bytes = '',
    gps_bytes = '',
    interop_bytes = '',
    first_bytes = ''

  const exif_pointer = '',
    gps_pointer = '',
    first_ifd_pointer = '\x00\x00\x00\x00'

  const zeroth_bytes = zeroth_set[0] + exif_pointer + gps_pointer + first_ifd_pointer + zeroth_set[1]

  return `${header}${zeroth_bytes}${exif_bytes}${gps_bytes}${interop_bytes}${first_bytes}`
}

function insert(exif, jpeg) {
  let b64 = false
  if (exif.slice(0, 6) != '\x45\x78\x69\x66\x00\x00') {
    throw new Error('Given data is not exif.')
  }
  if (jpeg.slice(0, 2) == '\xff\xd8') {
  } else if (jpeg.slice(0, 23) == 'data:image/jpeg;base64,' || jpeg.slice(0, 22) == 'data:image/jpg;base64,') {
    jpeg = atob(jpeg.split(',')[1])
    b64 = true
  } else {
    throw new Error('Given data is not jpeg.')
  }

  const exifStr = '\xff\xe1' + pack('>H', [exif.length + 2]) + exif
  const segments = splitIntoSegments(jpeg)
  let new_data = mergeSegments(segments, exifStr)

  if (b64) {
    new_data = 'data:image/jpeg;base64,' + btoa(new_data)
  }

  return new_data
}

function splitIntoSegments(data) {
  if (data.slice(0, 2) != '\xff\xd8') {
    throw new Error("Given data isn't JPEG.")
  }

  let head = 2
  const segments = ['\xff\xd8']

  while (true) {
    if (data.slice(head, head + 2) == '\xff\xda') {
      segments.push(data.slice(head))
      break
    } else {
      const length = unpack('>H', data.slice(head + 2, head + 4))[0]
      const endPoint = head + length + 2

      segments.push(data.slice(head, endPoint))
      head = endPoint
    }

    if (head >= data.length) {
      throw new Error('Wrong JPEG data.')
    }
  }
  return segments
}

function mergeSegments(segments, exif) {
  let hasExifSegment = false
  const additionalAPP1ExifSegments = []

  segments.forEach(function(segment, i) {
    // Replace first occurence of APP1:Exif segment
    if (segment.slice(0, 2) == '\xff\xe1' && segment.slice(4, 10) == 'Exif\x00\x00') {
      if (!hasExifSegment) {
        segments[i] = exif
        hasExifSegment = true
      } else {
        additionalAPP1ExifSegments.unshift(i)
      }
    }
  })

  // Remove additional occurences of APP1:Exif segment
  additionalAPP1ExifSegments.forEach(function(segmentIndex) {
    segments.splice(segmentIndex, 1)
  })

  if (!hasExifSegment && exif) {
    segments = [segments[0], exif].concat(segments.slice(1))
  }

  return segments.join('')
}

function _dict_to_bytes(ifd_dict, ifd, ifd_offset) {
  const TIFF_HEADER_LENGTH = 8
  const tag_count = Object.keys(ifd_dict).length
  const entry_header = pack('>H', [tag_count])
  let entries_length

  if (['0th', '1st'].indexOf(ifd) > -1) {
    entries_length = 2 + tag_count * 12 + 4
  } else {
    entries_length = 2 + tag_count * 12
  }

  let entries = ''
  let values = ''
  let key

  for (let key in ifd_dict) {
    if (typeof key == 'string') {
      key = parseInt(key)
    }
    if (ifd == '0th' && [34665, 34853].indexOf(key) > -1) {
      continue
    } else if (ifd == 'Exif' && key == 40965) {
      continue
    } else if (ifd == '1st' && [513, 514].indexOf(key) > -1) {
      continue
    }

    let raw_value = ifd_dict[key]
    const key_str = pack('>H', [key])
    const value_type = TAGS[ifd][key]['type']
    const type_str = pack('>H', [TYPES[value_type]])

    if (typeof raw_value == 'number') {
      raw_value = [raw_value]
    }
    const offset = TIFF_HEADER_LENGTH + entries_length + ifd_offset + values.length
    const b = _value_to_bytes(raw_value, value_type, offset)
    const length_str = b[0]
    const value_str = b[1]
    const four_bytes_over = b[2]

    entries += key_str + type_str + length_str + value_str
    values += four_bytes_over
  }

  return [entry_header + entries, values]
}

function pack(mark, array) {
  if (!(array instanceof Array)) {
    throw new Error("'pack' error. Got invalid type argument.")
  }
  if (mark.length - 1 != array.length) {
    throw new Error("'pack' error. " + (mark.length - 1) + ' marks, ' + array.length + ' elements.')
  }

  let littleEndian

  if (mark[0] == '<') {
    littleEndian = true
  } else if (mark[0] == '>') {
    littleEndian = false
  } else {
    throw new Error('')
  }

  let packed = ''
  let p = 1
  let val = null
  let c = null
  let valStr = null

  while ((c = mark[p])) {
    if (c.toLowerCase() == 'b') {
      val = array[p - 1]
      if (c == 'b' && val < 0) {
        val += 0x100
      }
      if (val > 0xff || val < 0) {
        throw new Error("'pack' error.")
      } else {
        valStr = String.fromCharCode(val)
      }
    } else if (c == 'H') {
      val = array[p - 1]
      if (val > 0xffff || val < 0) {
        throw new Error("'pack' error.")
      } else {
        valStr = String.fromCharCode(Math.floor((val % 0x10000) / 0x100)) + String.fromCharCode(val % 0x100)
        if (littleEndian) {
          valStr = valStr
            .split('')
            .reverse()
            .join('')
        }
      }
    } else if (c.toLowerCase() == 'l') {
      val = array[p - 1]
      if (c == 'l' && val < 0) {
        val += 0x100000000
      }
      if (val > 0xffffffff || val < 0) {
        throw new Error("'pack' error.")
      } else {
        valStr =
          String.fromCharCode(Math.floor(val / 0x1000000)) +
          String.fromCharCode(Math.floor((val % 0x1000000) / 0x10000)) +
          String.fromCharCode(Math.floor((val % 0x10000) / 0x100)) +
          String.fromCharCode(val % 0x100)
        if (littleEndian) {
          valStr = valStr
            .split('')
            .reverse()
            .join('')
        }
      }
    } else {
      throw new Error("'pack' error.")
    }

    packed += valStr
    p += 1
  }

  return packed
}

function unpack(mark, str) {
  if (typeof str != 'string') {
    throw new Error("'unpack' error. Got invalid type argument.")
  }

  let l = 0

  for (let markPointer = 1; markPointer < mark.length; markPointer++) {
    if (mark[markPointer].toLowerCase() == 'b') {
      l += 1
    } else if (mark[markPointer].toLowerCase() == 'h') {
      l += 2
    } else if (mark[markPointer].toLowerCase() == 'l') {
      l += 4
    } else {
      throw new Error("'unpack' error. Got invalid mark.")
    }
  }

  if (l != str.length) {
    throw new Error("'unpack' error. Mismatch between symbol and string length. " + l + ':' + str.length)
  }

  let littleEndian
  if (mark[0] == '<') {
    littleEndian = true
  } else if (mark[0] == '>') {
    littleEndian = false
  } else {
    throw new Error("'unpack' error.")
  }
  let unpacked = []
  let strPointer = 0
  let p = 1
  let val = null
  let c = null
  let length = null
  let sliced = ''

  while ((c = mark[p])) {
    if (c.toLowerCase() == 'b') {
      length = 1
      sliced = str.slice(strPointer, strPointer + length)
      val = sliced.charCodeAt(0)
      if (c == 'b' && val >= 0x80) {
        val -= 0x100
      }
    } else if (c == 'H') {
      length = 2
      sliced = str.slice(strPointer, strPointer + length)
      if (littleEndian) {
        sliced = sliced
          .split('')
          .reverse()
          .join('')
      }
      val = sliced.charCodeAt(0) * 0x100 + sliced.charCodeAt(1)
    } else if (c.toLowerCase() == 'l') {
      length = 4
      sliced = str.slice(strPointer, strPointer + length)
      if (littleEndian) {
        sliced = sliced
          .split('')
          .reverse()
          .join('')
      }
      val =
        sliced.charCodeAt(0) * 0x1000000 +
        sliced.charCodeAt(1) * 0x10000 +
        sliced.charCodeAt(2) * 0x100 +
        sliced.charCodeAt(3)
      if (c == 'l' && val >= 0x80000000) {
        val -= 0x100000000
      }
    } else {
      throw new Error("'unpack' error. " + c)
    }

    unpacked.push(val)
    strPointer += length
    p += 1
  }

  return unpacked
}

function _pack_byte(array) {
  return pack('>' + nStr('B', array.length), array)
}

function _pack_short(array) {
  return pack('>' + nStr('H', array.length), array)
}

function _pack_long(array) {
  return pack('>' + nStr('L', array.length), array)
}

function nStr(ch, num) {
  let str = ''
  for (let i = 0; i < num; i++) {
    str += ch
  }
  return str
}

function _value_to_bytes(raw_value, value_type, offset) {
  let four_bytes_over = ''
  let value_str = ''
  let length, new_value, num, den

  if (value_type == 'Byte') {
    length = raw_value.length
    if (length <= 4) {
      value_str = _pack_byte(raw_value) + nStr('\x00', 4 - length)
    } else {
      value_str = pack('>L', [offset])
      four_bytes_over = _pack_byte(raw_value)
    }
  } else if (value_type == 'Short') {
    length = raw_value.length
    if (length <= 2) {
      value_str = _pack_short(raw_value) + nStr('\x00\x00', 2 - length)
    } else {
      value_str = pack('>L', [offset])
      four_bytes_over = _pack_short(raw_value)
    }
  } else if (value_type == 'Long') {
    length = raw_value.length
    if (length <= 1) {
      value_str = _pack_long(raw_value)
    } else {
      value_str = pack('>L', [offset])
      four_bytes_over = _pack_long(raw_value)
    }
  } else if (value_type == 'Ascii') {
    new_value = raw_value + '\x00'
    length = new_value.length
    if (length > 4) {
      value_str = pack('>L', [offset])
      four_bytes_over = new_value
    } else {
      value_str = new_value + nStr('\x00', 4 - length)
    }
  } else if (value_type == 'Rational') {
    if (typeof raw_value[0] == 'number') {
      length = 1
      num = raw_value[0]
      den = raw_value[1]
      new_value = pack('>L', [num]) + pack('>L', [den])
    } else {
      length = raw_value.length
      new_value = ''
      for (let n = 0; n < length; n++) {
        num = raw_value[n][0]
        den = raw_value[n][1]
        new_value += pack('>L', [num]) + pack('>L', [den])
      }
    }
    value_str = pack('>L', [offset])
    four_bytes_over = new_value
  } else if (value_type == 'SRational') {
    if (typeof raw_value[0] == 'number') {
      length = 1
      num = raw_value[0]
      den = raw_value[1]
      new_value = pack('>l', [num]) + pack('>l', [den])
    } else {
      length = raw_value.length
      new_value = ''
      for (let n = 0; n < length; n++) {
        num = raw_value[n][0]
        den = raw_value[n][1]
        new_value += pack('>l', [num]) + pack('>l', [den])
      }
    }
    value_str = pack('>L', [offset])
    four_bytes_over = new_value
  } else if (value_type == 'Undefined') {
    length = raw_value.length
    if (length > 4) {
      value_str = pack('>L', [offset])
      four_bytes_over = raw_value
    } else {
      value_str = raw_value + nStr('\x00', 4 - length)
    }
  }

  const length_str = pack('>L', [length])

  return [length_str, value_str, four_bytes_over]
}

export default {
  insertExifRotation
}
