document.addEventListener('DOMContentLoaded', function() {
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach(tile => {
        const trexOverlay = tile.querySelector('.trex-overlay');
        const trexImage = tile.querySelector('.trex-image');
        
        tile.addEventListener('mouseenter', function() {
            trexOverlay.style.opacity = '0.8';
        });
        
        tile.addEventListener('mouseleave', function() {
            trexOverlay.style.opacity = '0';
            trexImage.style.transform = 'translate(-50%, -50%)';
        });
        
        tile.addEventListener('mousemove', function(e) {
            const rect = tile.getBoundingClientRect();
            const tileWidth = rect.width;
            const tileHeight = rect.height;
            
            // Get mouse position relative to tile
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate center of tile
            const centerX = tileWidth / 2;
            const centerY = tileHeight / 2;
            
            // Calculate distance from center
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            
            // Calculate opacity based on distance (closer to center = more visible)
            const opacity = Math.max(0.2, 1 - (distance / maxDistance));
            trexOverlay.style.opacity = opacity;
            
            // Move T-Rex opposite to mouse direction
            const moveMultiplier = 0.3;
            const offsetX = -deltaX * moveMultiplier;
            const offsetY = -deltaY * moveMultiplier;
            
            // Apply transform with limits to keep T-Rex visible
            const maxOffset = 40;
            const clampedX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
            const clampedY = Math.max(-maxOffset, Math.min(maxOffset, offsetY));
            
            trexImage.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
        });
    });
});