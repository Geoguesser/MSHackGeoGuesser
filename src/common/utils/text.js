const ALIGN = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center"
};

const VERTICAL_ALIGN = {
  CENTER: "center",
  TOP: "top",
  BOTTOM: "bottom"
};

function getVerticalAlign(alignment) {
  return {
    "has-content-vertical-centered": alignment === VERTICAL_ALIGN.CENTER,
    "has-content-vertical-top": alignment === VERTICAL_ALIGN.TOP,
    "has-content-vertical-bottom": alignment === VERTICAL_ALIGN.BOTTOM
  };
}

function getTextAlign(alignment) {
  return {
    "has-text-centered": alignment === ALIGN.CENTER,
    "has-text-right": alignment === ALIGN.RIGHT,
    "has-text-left": alignment === ALIGN.LEFT
  };
}

function getContentAlign(alignment) {
  return {
    "has-content-centered": alignment === ALIGN.CENTER,
    "has-content-right": alignment === ALIGN.RIGHT,
    "has-content-left": alignment === ALIGN.LEFT
  };
}

export { getTextAlign, getContentAlign, getVerticalAlign };
