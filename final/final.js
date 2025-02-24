
const clothes1 = document.querySelectorAll('.clothes-image');
const reset = document.querySelector('#reset');


// https://javascript.info/mouse-drag-and-drop

clothes1.forEach((clothesImage) => {
	clothesImage.onmousedown = function(event) {
    clothesImage.classList.remove("resetting");
    clothesImage.classList.add("pickedup");

    clothesImage.style.zIndex = 10;

    // stops the image from "jumping" to your mouse when picked up
    let shiftX = event.clientX - clothesImage.getBoundingClientRect().left;
    let shiftY = event.clientY - clothesImage.getBoundingClientRect().top;

    // clothesImage.style.position = 'absolute';
    // clothesImage.style.zIndex = 1000;
    // document.body.append(clothesImage);

    moveAt(event.pageX, event.pageY);

    // moves the clothes at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      clothesImage.style.left = `${pageX - shiftX}px`;
      clothesImage.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    
    // move the clothes on mousemove
    document.addEventListener('mousemove', onMouseMove);
    function cleanup() {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('pointerleave', onPointerLeave);
      clothesImage.onmouseup = null;
      clothesImage.style.zIndex = "";
      clothesImage.classList.remove("pickedup");
    }
    function onPointerLeave(event) {
      cleanup();
    }

    // drop the clothes, remove unneeded handlers
    clothesImage.onmouseup = function() {
      cleanup();
    };

    document.body.addEventListener("pointerleave", onPointerLeave)

  };

  clothesImage.ondragstart = function() {
    return false;
  };

});

// add .resetting transition to .clothes-image
reset.onclick = function(event) {
  clothes1.forEach((clothesImage) => {
    clothesImage.classList.add("resetting");
    clothesImage.style = "";
  });
}

