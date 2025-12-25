<script setup>
import { ref, computed } from 'vue'

const ipAddress = ref('192.168.1.0')
const subnetMask = ref('24')

const subnetInfo = computed(() => {
  try {
    const ip = ipAddress.value.split('.').map(Number)
    const cidr = parseInt(subnetMask.value)
    
    if (ip.length !== 4 || ip.some(n => isNaN(n) || n < 0 || n > 255)) {
      return null
    }
    
    if (isNaN(cidr) || cidr < 0 || cidr > 32) {
      return null
    }
    
    // 计算子网掩码
    const mask = []
    for (let i = 0; i < 4; i++) {
      const bits = Math.max(0, Math.min(8, cidr - i * 8))
      mask.push(256 - Math.pow(2, 8 - bits))
    }
    
    // 计算网络地址
    const network = ip.map((octet, i) => octet & mask[i])
    
    // 计算广播地址
    const broadcast = mask.map((m, i) => network[i] | (255 - m))
    
    // 计算第一个可用IP
    const firstHost = [...network]
    firstHost[3] += 1
    
    // 计算最后一个可用IP
    const lastHost = [...broadcast]
    lastHost[3] -= 1
    
    // 计算总主机数
    const totalHosts = Math.pow(2, 32 - cidr)
    const usableHosts = cidr === 31 ? 2 : (cidr === 32 ? 1 : totalHosts - 2)
    
    // 通配符掩码（反掩码）
    const wildcard = mask.map(m => 255 - m)
    
    // IP类别
    let ipClass = 'Unknown'
    if (ip[0] >= 1 && ip[0] <= 126) ipClass = 'A'
    else if (ip[0] >= 128 && ip[0] <= 191) ipClass = 'B'
    else if (ip[0] >= 192 && ip[0] <= 223) ipClass = 'C'
    else if (ip[0] >= 224 && ip[0] <= 239) ipClass = 'D (Multicast)'
    else if (ip[0] >= 240 && ip[0] <= 255) ipClass = 'E (Reserved)'
    
    // 私有IP检测
    const isPrivate = (ip[0] === 10) ||
                     (ip[0] === 172 && ip[1] >= 16 && ip[1] <= 31) ||
                     (ip[0] === 192 && ip[1] === 168)
    
    return {
      ipAddress: ip.join('.'),
      cidr: cidr,
      subnetMask: mask.join('.'),
      wildcardMask: wildcard.join('.'),
      networkAddress: network.join('.'),
      broadcastAddress: broadcast.join('.'),
      firstHost: firstHost.join('.'),
      lastHost: lastHost.join('.'),
      totalHosts: totalHosts,
      usableHosts: usableHosts,
      ipClass: ipClass,
      isPrivate: isPrivate,
      binaryMask: mask.map(m => m.toString(2).padStart(8, '0')).join('.'),
      binaryIP: ip.map(n => n.toString(2).padStart(8, '0')).join('.')
    }
  } catch (e) {
    return null
  }
})

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const commonSubnets = [
  { cidr: 8, mask: '255.0.0.0', hosts: '16,777,214' },
  { cidr: 16, mask: '255.255.0.0', hosts: '65,534' },
  { cidr: 24, mask: '255.255.255.0', hosts: '254' },
  { cidr: 25, mask: '255.255.255.128', hosts: '126' },
  { cidr: 26, mask: '255.255.255.192', hosts: '62' },
  { cidr: 27, mask: '255.255.255.224', hosts: '30' },
  { cidr: 28, mask: '255.255.255.240', hosts: '14' },
  { cidr: 29, mask: '255.255.255.248', hosts: '6' },
  { cidr: 30, mask: '255.255.255.252', hosts: '2' },
  { cidr: 31, mask: '255.255.255.254', hosts: '2 (P2P)' },
  { cidr: 32, mask: '255.255.255.255', hosts: '1' }
]

const useCommonSubnet = (cidr) => {
  subnetMask.value = cidr.toString()
}
</script>

<template>
  <div class="tool-container">
    <div class="input-section">
      <div class="input-group">
        <label>IP地址</label>
        <input 
          v-model="ipAddress"
          type="text"
          placeholder="192.168.1.0"
          class="input-field"
        />
      </div>
      
      <div class="input-group">
        <label>子网掩码 (CIDR)</label>
        <div class="cidr-input">
          <span class="slash">/</span>
          <input 
            v-model="subnetMask"
            type="number"
            min="0"
            max="32"
            class="input-field"
            placeholder="24"
          />
        </div>
      </div>
    </div>

    <div v-if="subnetInfo" class="result-section">
      <h3>📊 子网信息</h3>
      
      <div class="info-grid">
        <div class="info-card">
          <div class="card-label">IP地址</div>
          <div class="card-value">{{ subnetInfo.ipAddress }}</div>
          <button @click="copy(subnetInfo.ipAddress)" class="mini-copy">📋</button>
        </div>

        <div class="info-card">
          <div class="card-label">CIDR表示</div>
          <div class="card-value">{{ subnetInfo.ipAddress }}/{{ subnetInfo.cidr }}</div>
          <button @click="copy(`${subnetInfo.ipAddress}/${subnetInfo.cidr}`)" class="mini-copy">📋</button>
        </div>

        <div class="info-card">
          <div class="card-label">子网掩码</div>
          <div class="card-value">{{ subnetInfo.subnetMask }}</div>
          <button @click="copy(subnetInfo.subnetMask)" class="mini-copy">📋</button>
        </div>

        <div class="info-card">
          <div class="card-label">通配符掩码</div>
          <div class="card-value">{{ subnetInfo.wildcardMask }}</div>
          <button @click="copy(subnetInfo.wildcardMask)" class="mini-copy">📋</button>
        </div>

        <div class="info-card highlight">
          <div class="card-label">网络地址</div>
          <div class="card-value">{{ subnetInfo.networkAddress }}</div>
          <button @click="copy(subnetInfo.networkAddress)" class="mini-copy">📋</button>
        </div>

        <div class="info-card highlight">
          <div class="card-label">广播地址</div>
          <div class="card-value">{{ subnetInfo.broadcastAddress }}</div>
          <button @click="copy(subnetInfo.broadcastAddress)" class="mini-copy">📋</button>
        </div>

        <div class="info-card success">
          <div class="card-label">第一个可用IP</div>
          <div class="card-value">{{ subnetInfo.firstHost }}</div>
          <button @click="copy(subnetInfo.firstHost)" class="mini-copy">📋</button>
        </div>

        <div class="info-card success">
          <div class="card-label">最后一个可用IP</div>
          <div class="card-value">{{ subnetInfo.lastHost }}</div>
          <button @click="copy(subnetInfo.lastHost)" class="mini-copy">📋</button>
        </div>

        <div class="info-card">
          <div class="card-label">总主机数</div>
          <div class="card-value">{{ subnetInfo.totalHosts.toLocaleString() }}</div>
        </div>

        <div class="info-card">
          <div class="card-label">可用主机数</div>
          <div class="card-value">{{ subnetInfo.usableHosts.toLocaleString() }}</div>
        </div>

        <div class="info-card">
          <div class="card-label">IP类别</div>
          <div class="card-value">Class {{ subnetInfo.ipClass }}</div>
        </div>

        <div class="info-card">
          <div class="card-label">IP类型</div>
          <div class="card-value">
            <span :class="subnetInfo.isPrivate ? 'private' : 'public'">
              {{ subnetInfo.isPrivate ? '私有IP' : '公网IP' }}
            </span>
          </div>
        </div>
      </div>

      <div class="binary-section">
        <h4>二进制表示</h4>
        <div class="binary-item">
          <span class="binary-label">IP地址:</span>
          <span class="binary-value">{{ subnetInfo.binaryIP }}</span>
        </div>
        <div class="binary-item">
          <span class="binary-label">子网掩码:</span>
          <span class="binary-value">{{ subnetInfo.binaryMask }}</span>
        </div>
      </div>
    </div>

    <div class="quick-select">
      <h4>常用子网掩码</h4>
      <div class="subnet-grid">
        <button
          v-for="subnet in commonSubnets"
          :key="subnet.cidr"
          @click="useCommonSubnet(subnet.cidr)"
          :class="['subnet-btn', { active: subnetMask == subnet.cidr }]"
        >
          <div class="subnet-cidr">/{{ subnet.cidr }}</div>
          <div class="subnet-mask">{{ subnet.mask }}</div>
          <div class="subnet-hosts">{{ subnet.hosts }} 主机</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.cidr-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slash {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-secondary);
}

.input-field {
  width: 100%;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 15px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 600;
  color: var(--text-color);
  outline: none;
}

.input-field:focus {
  border-color: var(--primary-color);
}

.result-section {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.result-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.info-card {
  position: relative;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-card.highlight {
  background: linear-gradient(135deg, var(--primary-color)15, var(--card-bg));
  border-color: var(--primary-color);
}

.info-card.success {
  background: linear-gradient(135deg, #10b98115, var(--card-bg));
  border-color: #10b981;
}

.card-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.card-value {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
}

.card-value .private {
  color: #10b981;
}

.card-value .public {
  color: var(--primary-color);
}

.mini-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.mini-copy:hover {
  opacity: 1;
}

.binary-section {
  margin-top: 16px;
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
}

.binary-section h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.binary-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  font-size: 12px;
}

.binary-label {
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 80px;
}

.binary-value {
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  word-break: break-all;
}

.quick-select {
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.quick-select h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.subnet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.subnet-btn {
  padding: 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.subnet-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.subnet-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.subnet-btn.active .subnet-cidr,
.subnet-btn.active .subnet-mask,
.subnet-btn.active .subnet-hosts {
  color: white;
}

.subnet-cidr {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.subnet-mask {
  font-size: 11px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  margin-bottom: 2px;
}

.subnet-hosts {
  font-size: 10px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .input-section {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .subnet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
