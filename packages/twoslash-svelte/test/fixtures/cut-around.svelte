<script>
    let count = $state(0);
    
    // ---cut-before---
    function increment() {
        count++;
    }
    // ---cut-after---
</script>

<button onclick={increment}>
    Count is: {count}
</button>