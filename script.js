document.getElementById('resizeBtn').addEventListener('click', function() {
    const textElement = document.getElementById('text');
    const currentSize = window.getComputedStyle(textElement).fontSize;
    const newSize = parseInt(currentSize) + 2 + 'px';  // Increase size by 2px

    textElement.style.fontSize = newSize;
});