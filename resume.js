
var ImageSequences = {
    "hview":5,
    "subdivision":6,
    "dx":5,
    "fp":2
};

var ImageViewOverlayNode = null;
var ImageNode = null;
var CurrentSequence;
var CurrentIndex;

/*
 <div id="Overlay">
    <div id="ImageContainer">
        <img id="Image" src=filename/>
    </div>
 </div>
 */

$(document).keyup(function(e)
{
    if (e.keyCode === 27) //  escape
    {
        HideImage();
    }
});

function ShowImage(sequence, index)
{
    if (ImageViewOverlayNode != null)
        HideImage();


    ImageViewOverlayNode = document.createElement("DIV");
    ImageViewOverlayNode.setAttribute("id", "Overlay");
    ImageViewOverlayNode.setAttribute("onclick", "event.stopPropagation();HideImage()");

    var imageContainer = document.createElement("DIV");
    imageContainer.setAttribute("id", "ImageContainer");
    imageContainer.setAttribute("onclick", "event.stopPropagation();HideImage()");

    ImageNode = document.createElement("IMG");
    ImageNode.setAttribute("id", "Image");
    ImageNode.setAttribute("onclick", "event.stopPropagation();ScrollImage(CurrentIndex+1)");

    imageContainer.appendChild(ImageNode);
    ImageViewOverlayNode.appendChild(imageContainer);
    document.body.appendChild(ImageViewOverlayNode);

    CurrentSequence = sequence;
    ScrollImage(index);
}

function ScrollImage(newIndex)
{
    if (ImageNode != null)
    {
        CurrentIndex = newIndex;
        if (CurrentIndex < 1)
            CurrentIndex = ImageSequences[CurrentSequence]-1;
        if (CurrentIndex > ImageSequences[CurrentSequence])
            CurrentIndex = 1;
        ImageNode.setAttribute("src", "images/".concat(CurrentSequence).concat(CurrentIndex.toString()).concat(".jpg"));
    }
}

function HideImage()
{
    document.body.removeChild(ImageViewOverlayNode);
    ImageViewOverlayNode = null;
    ImageNode = null;
}

function ScrollTo(elemId)
{
    var elem = document.getElementById(elemId);
    elem.scrollIntoView();

    try {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        page = page.split('#').shift()
        //console.log(page);
        window.history.pushState(elemId, '', '/personal/'.concat(page).concat('#').concat(elemId));
    } catch (e) {
        console.log(e);
    }
}
