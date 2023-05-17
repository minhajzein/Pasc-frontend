import { PixelCrop } from "react-image-crop";

//imports=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const TO_RADIANS = Math.PI / 180;

const getCroppedImage = (
	image: HTMLImageElement,
	canvas: HTMLCanvasElement,
	crop: PixelCrop,
	scale = 1,
	rotate = 0
) => {
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("No 2d context");
	}

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const pixelRatio = window.devicePixelRatio;
	// const pixelRatio = 1

	canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
	canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

	ctx.scale(pixelRatio, pixelRatio);
	ctx.imageSmoothingQuality = "high";

	const cropX = crop.x * scaleX;
	const cropY = crop.y * scaleY;

	const rotateRads = rotate * TO_RADIANS;
	const centerX = image.naturalWidth / 2;
	const centerY = image.naturalHeight / 2;

	ctx.save();

	ctx.translate(-cropX, -cropY);
	ctx.translate(centerX, centerY);
	ctx.rotate(rotateRads);
	ctx.scale(scale, scale);
	ctx.translate(-centerX, -centerY);
	ctx.drawImage(
		image,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight
	);

	ctx.restore();
};
let previewUrl = "";

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
	return new Promise(resolve => {
		canvas.toBlob(resolve);
	});
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
	image: HTMLImageElement,
	crop: PixelCrop,
	scale = 1,
	rotate = 0
) {
	const canvas = document.createElement("canvas");
	getCroppedImage(image, canvas, crop, scale, rotate);

	const blob = await toBlob(canvas);

	if (!blob) {
		console.error("Failed to create blob");
		return "";
	}

	if (previewUrl) {
		URL.revokeObjectURL(previewUrl);
	}

	previewUrl = URL.createObjectURL(blob);
	return previewUrl;
}
