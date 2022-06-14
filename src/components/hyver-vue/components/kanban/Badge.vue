<template>
  <div
      class="px-2 py-2"
      :class="`badge bg-${color} text-${color}-700`"
  >
    <span class="mr-1" :class="`badge bg-${color}`"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "teal"
    }
  }
};
</script>
