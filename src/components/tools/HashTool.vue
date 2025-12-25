<script setup>
import { ref } from 'vue'

const input = ref('')
const algorithm = ref('MD5')
const output = ref('')

const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

// MD5算法实现
const md5 = (string) => {
  const rotateLeft = (value, shift) => {
    return (value << shift) | (value >>> (32 - shift))
  }
  
  const addUnsigned = (x, y) => {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF)
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }
  
  const F = (x, y, z) => (x & y) | ((~x) & z)
  const G = (x, y, z) => (x & z) | (y & (~z))
  const H = (x, y, z) => x ^ y ^ z
  const I = (x, y, z) => y ^ (x | (~z))
  
  const FF = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  
  const GG = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  
  const HH = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  
  const II = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  
  const convertToWordArray = (string) => {
    let lWordCount
    const lMessageLength = string.length
    const lNumberOfWords_temp1 = lMessageLength + 8
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
    const lWordArray = Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
      lByteCount++
    }
    
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    
    return lWordArray
  }
  
  const wordToHex = (lValue) => {
    let wordToHexValue = ''
    let wordToHexValue_temp = ''
    let lByte, lCount
    
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      wordToHexValue_temp = '0' + lByte.toString(16)
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2)
    }
    
    return wordToHexValue
  }
  
  let x = convertToWordArray(string)
  let a = 0x67452301
  let b = 0xEFCDAB89
  let c = 0x98BADCFE
  let d = 0x10325476
  
  const S11 = 7, S12 = 12, S13 = 17, S14 = 22
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21
  
  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d
    
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
    
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
    
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
    
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
    
    a = addUnsigned(a, AA)
    b = addUnsigned(b, BB)
    c = addUnsigned(c, CC)
    d = addUnsigned(d, DD)
  }
  
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase()
}

const hashText = async () => {
  if (!input.value) {
    output.value = ''
    return
  }
  
  // MD5特殊处理
  if (algorithm.value === 'MD5') {
    output.value = md5(input.value)
    return
  }
  
  // SHA系列使用Web Crypto API
  const encoder = new TextEncoder()
  const data = encoder.encode(input.value)
  
  let alg = ''
  switch(algorithm.value) {
    case 'SHA-1': alg = 'SHA-1'; break
    case 'SHA-256': alg = 'SHA-256'; break
    case 'SHA-384': alg = 'SHA-384'; break
    case 'SHA-512': alg = 'SHA-512'; break
    default: 
      output.value = '不支持的算法'
      return
  }
  
  try {
    const hashBuffer = await crypto.subtle.digest(alg, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    output.value = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } catch (e) {
    output.value = '计算失败: ' + e.message
  }
}

const compute = async () => {
  await hashText()
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

// 自动计算
const handleInput = () => {
  compute()
}
</script>

<template>
  <div class="tool-container">
    <div class="settings-panel">
      <div class="setting-group">
        <label>哈希算法</label>
        <select v-model="algorithm" class="select-input" @change="compute">
          <option v-for="alg in algorithms" :key="alg" :value="alg">
            {{ alg }}
          </option>
        </select>
      </div>
    </div>

    <div class="io-section">
      <div class="io-header">
        <label>输入文本</label>
      </div>
      <textarea 
        v-model="input"
        @input="handleInput"
        placeholder="输入要计算哈希值的文本..."
        class="io-textarea"
      ></textarea>
    </div>

    <div class="io-section">
      <div class="io-header">
        <label>{{ algorithm }} 哈希值</label>
        <button 
          @click="copy(output)" 
          class="copy-btn"
          :disabled="!output"
        >
          📋 复制
        </button>
      </div>
      <div class="hash-output">
        {{ output || '输入文本后将显示哈希值' }}
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <ul>
        <li><strong>MD5:</strong> 128位哈希值，已不推荐用于安全场景</li>
        <li><strong>SHA-1:</strong> 160位哈希值，已不推荐用于安全场景</li>
        <li><strong>SHA-256:</strong> 256位哈希值，推荐使用</li>
        <li><strong>SHA-384:</strong> 384位哈希值</li>
        <li><strong>SHA-512:</strong> 512位哈希值</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-panel {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.select-input {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  outline: none;
}

.select-input:focus {
  border-color: var(--primary-color);
}

.io-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.io-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.io-header label {
  font-weight: 600;
  color: var(--text-color);
}

.copy-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.copy-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.io-textarea {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.io-textarea:focus {
  border-color: var(--primary-color);
}

.io-textarea::placeholder {
  color: var(--text-secondary);
}

.hash-output {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-color);
  word-break: break-all;
  min-height: 60px;
}

.info-box {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 12px;
  color: var(--text-color);
  font-size: 15px;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.info-box li strong {
  color: var(--primary-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .settings-panel {
    padding: 16px;
  }

  .io-textarea {
    min-height: 150px;
    font-size: 13px;
  }

  .hash-output {
    font-size: 13px;
    padding: 14px;
  }

  .info-box {
    padding: 16px;
  }

  .info-box h4 {
    font-size: 14px;
  }

  .info-box li {
    font-size: 13px;
  }
}
</style>
