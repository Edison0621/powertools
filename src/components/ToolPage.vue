<script setup>
import Base64Tool from './tools/Base64Tool.vue'
import JsonFormatterTool from './tools/JsonFormatterTool.vue'
import UuidGeneratorTool from './tools/UuidGeneratorTool.vue'
import HashTool from './tools/HashTool.vue'
import UrlEncoderTool from './tools/UrlEncoderTool.vue'
import ColorConverterTool from './tools/ColorConverterTool.vue'
import PasswordGeneratorTool from './tools/PasswordGeneratorTool.vue'
import TimestampTool from './tools/TimestampTool.vue'
import HtmlEncoderTool from './tools/HtmlEncoderTool.vue'
import CaseConverterTool from './tools/CaseConverterTool.vue'
import WordCounterTool from './tools/WordCounterTool.vue'
import NumberBaseTool from './tools/NumberBaseTool.vue'
import RegexTesterTool from './tools/RegexTesterTool.vue'
import TextDiffTool from './tools/TextDiffTool.vue'
import LoremIpsumTool from './tools/LoremIpsumTool.vue'
import UnitConverterTool from './tools/UnitConverterTool.vue'
import JwtDecoderTool from './tools/JwtDecoderTool.vue'
import QrGeneratorTool from './tools/QrGeneratorTool.vue'
import CalculatorTool from './tools/CalculatorTool.vue'
import PercentageTool from './tools/PercentageTool.vue'
import IpLookupTool from './tools/IpLookupTool.vue'
import Ipv4CalcTool from './tools/Ipv4CalcTool.vue'
import SqlFormatterTool from './tools/SqlFormatterTool.vue'
import YamlJsonTool from './tools/YamlJsonTool.vue'
import MarkdownTool from './tools/MarkdownTool.vue'
import DiffCheckerTool from './tools/DiffCheckerTool.vue'
import DnsLookupTool from './tools/DnsLookupTool.vue'
import PortCheckerTool from './tools/PortCheckerTool.vue'
import ImagePreviewTool from './tools/ImagePreviewTool.vue'
import CronGeneratorTool from './tools/CronGeneratorTool.vue'
import RandomGeneratorTool from './tools/RandomGeneratorTool.vue'
import TextEncryptTool from './tools/TextEncryptTool.vue'
import ImageBase64Tool from './tools/ImageBase64Tool.vue'
import ImageInfoTool from './tools/ImageInfoTool.vue'
import ImagePlaceholderTool from './tools/ImagePlaceholderTool.vue'
import TextBatchAddTool from './tools/TextBatchAddTool.vue'
import DateCalculatorTool from './tools/DateCalculatorTool.vue'
import WorkdayCalculatorTool from './tools/WorkdayCalculatorTool.vue'
import TimezoneConverterTool from './tools/TimezoneConverterTool.vue'
import CountdownTimerTool from './tools/CountdownTimerTool.vue'
import HttpRequestTool from './tools/HttpRequestTool.vue'
import MockDataTool from './tools/MockDataTool.vue'
import ApiFormatterTool from './tools/ApiFormatterTool.vue'
import CurlConverterTool from './tools/CurlConverterTool.vue'
import PasswordStrengthTool from './tools/PasswordStrengthTool.vue'
import DataMaskingTool from './tools/DataMaskingTool.vue'
import SecureDeleteTool from './tools/SecureDeleteTool.vue'
import PrivacyCheckerTool from './tools/PrivacyCheckerTool.vue'

const props = defineProps({
  tool: Object
})

const emit = defineEmits(['close'])

const toolComponents = {
  'base64': Base64Tool,
  'json-formatter': JsonFormatterTool,
  'uuid-generator': UuidGeneratorTool,
  'hash': HashTool,
  'url-encoder': UrlEncoderTool,
  'color-converter': ColorConverterTool,
  'password-generator': PasswordGeneratorTool,
  'timestamp': TimestampTool,
  'html-encoder': HtmlEncoderTool,
  'case-converter': CaseConverterTool,
  'word-counter': WordCounterTool,
  'number-base': NumberBaseTool,
  'regex-tester': RegexTesterTool,
  'text-diff': TextDiffTool,
  'lorem-ipsum': LoremIpsumTool,
  'unit-converter': UnitConverterTool,
  'jwt-decoder': JwtDecoderTool,
  'qr-generator': QrGeneratorTool,
  'calculator': CalculatorTool,
  'percentage': PercentageTool,
  'ip-lookup': IpLookupTool,
  'ipv4-calc': Ipv4CalcTool,
  'sql-formatter': SqlFormatterTool,
  'yaml-json': YamlJsonTool,
  'markdown-preview': MarkdownTool,
  'diff-checker': DiffCheckerTool,
  'dns-lookup': DnsLookupTool,
  'port-checker': PortCheckerTool,
  'image-preview': ImagePreviewTool,
  'cron-generator': CronGeneratorTool,
  'random-generator': RandomGeneratorTool,
  'text-encrypt': TextEncryptTool,
  'image-base64': ImageBase64Tool,
  'image-info': ImageInfoTool,
  'image-placeholder': ImagePlaceholderTool,
  'text-batch-add': TextBatchAddTool,
  'date-calculator': DateCalculatorTool,
  'workday-calculator': WorkdayCalculatorTool,
  'timezone-converter': TimezoneConverterTool,
  'countdown-timer': CountdownTimerTool,
  'http-request': HttpRequestTool,
  'mock-data': MockDataTool,
  'api-formatter': ApiFormatterTool,
  'curl-converter': CurlConverterTool,
  'password-strength': PasswordStrengthTool,
  'data-masking': DataMaskingTool,
  'secure-delete': SecureDeleteTool,
  'privacy-checker': PrivacyCheckerTool
}
</script>

<template>
  <div class="tool-page-overlay" @click="emit('close')">
    <div class="tool-page" @click.stop>
      <div class="tool-page-header">
        <div class="tool-page-title">
          <span class="tool-page-icon">{{ tool.icon }}</span>
          <h2>{{ tool.name }}</h2>
        </div>
        <button @click="emit('close')" class="close-btn">✕</button>
      </div>
      
      <div class="tool-page-content">
        <component 
          :is="toolComponents[tool.id]" 
          v-if="toolComponents[tool.id]"
        />
        <div v-else class="coming-soon">
          <div class="coming-soon-icon">🚧</div>
          <h3>开发中</h3>
          <p>该工具正在开发中，敬请期待...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.tool-page {
  background: var(--card-bg);
  border-radius: 20px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tool-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .tool-page-header {
    padding: 16px 20px;
  }
}

.tool-page-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tool-page-icon {
  font-size: 36px;
}

@media (max-width: 768px) {
  .tool-page-icon {
    font-size: 28px;
  }
}

.tool-page-title h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .tool-page-title h2 {
    font-size: 20px;
  }
}

.close-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--border-color);
  transform: rotate(90deg);
}

.tool-page-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

@media (max-width: 768px) {
  .tool-page-content {
    padding: 20px 16px;
  }
}

.coming-soon {
  text-align: center;
  padding: 80px 20px;
}

@media (max-width: 768px) {
  .coming-soon {
    padding: 60px 20px;
  }
}

.coming-soon-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .coming-soon-icon {
    font-size: 48px;
  }
}

.coming-soon h3 {
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .coming-soon h3 {
    font-size: 20px;
  }
}

.coming-soon p {
  color: var(--text-secondary);
  font-size: 16px;
}

@media (max-width: 768px) {
  .coming-soon p {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .tool-page {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .tool-page-overlay {
    padding: 0;
  }
}
</style>
