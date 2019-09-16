const ALIGN_TEXT = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center"
};

function getTextAlign(alignment) {
  return {
    "has-text-centered": alignment === ALIGN_TEXT.CENTER,
    "has-text-right": alignment === ALIGN_TEXT.RIGHT,
    "has-text-left": alignment === ALIGN_TEXT.LEFT
  };
}

export { getTextAlign };
