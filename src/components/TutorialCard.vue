<script setup>
defineProps({
  tutorial: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="tutorial-card">
    <div class="tutorial-header">
      <div class="tutorial-icon" :style="{ background: tutorial.color }">
        {{ tutorial.icon }}
      </div>
      <span class="tutorial-level" :class="tutorial.level">
        {{ tutorial.level }}
      </span>
    </div>
    <div class="tutorial-body">
      <h3 class="tutorial-name">{{ tutorial.name }}</h3>
      <p class="tutorial-desc">{{ tutorial.description }}</p>
    </div>
    <div class="tutorial-footer">
      <span class="tutorial-link">开始学习 →</span>
    </div>
  </div>
</template>

<style scoped>
.tutorial-card {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tutorial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

.tutorial-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(135deg, var(--bg-color) 0%, var(--card-bg) 100%);
}

.tutorial-icon {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.tutorial-card:hover .tutorial-icon {
  transform: scale(1.1) rotate(5deg);
}

.tutorial-body {
  padding: 0 24px 20px;
  flex: 1;
}

.tutorial-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-color);
  line-height: 1.3;
}

.tutorial-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.tutorial-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tutorial-link {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.tutorial-card:hover .tutorial-link {
  transform: translateX(4px);
}

.tutorial-level {
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  white-space: nowrap;
}

.tutorial-level.初级 {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #2e7d32;
  border: 1px solid #81c784;
}

.dark .tutorial-level.初级 {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  color: #a5d6a7;
  border: 1px solid #388e3c;
}

.tutorial-level.中级 {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  color: #ef6c00;
  border: 1px solid #ffb74d;
}

.dark .tutorial-level.中级 {
  background: linear-gradient(135deg, #e65100 0%, #ef6c00 100%);
  color: #ffcc80;
  border: 1px solid #f57c00;
}

.tutorial-level.高级 {
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
  color: #c2185b;
  border: 1px solid #f06292;
}

.dark .tutorial-level.高级 {
  background: linear-gradient(135deg, #880e4f 0%, #ad1457 100%);
  color: #f48fb1;
  border: 1px solid #c2185b;
}

.dark .tutorial-card {
  border: 1px solid #333333;
}

.dark .tutorial-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(92, 184, 92, 0.15);
}

.dark .tutorial-header {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

.dark .tutorial-footer {
  border-top-color: #2a2a2a;
}
</style>
