<template>
  <div class="test-style">
    <p>
      <slot name="info-box">
        default
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'InfoBox'
}
</script>
