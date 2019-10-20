import { VERTICAL_ALIGNMENT, HORIZONTAL_ALIGNMENT } from "../../utils/types";

function getVerticalAlign(
  alignment: VERTICAL_ALIGNMENT
): {
  "has-content-vertical-centered": boolean;
  "has-content-vertical-top": boolean;
  "has-content-vertical-bottom": boolean;
} {
  return {
    "has-content-vertical-centered": alignment === VERTICAL_ALIGNMENT.CENTER,
    "has-content-vertical-top": alignment === VERTICAL_ALIGNMENT.TOP,
    "has-content-vertical-bottom": alignment === VERTICAL_ALIGNMENT.BOTTOM
  };
}

function getTextAlign(
  alignment: HORIZONTAL_ALIGNMENT
): {
  "has-text-centered": boolean;
  "has-text-right": boolean;
  "has-text-left": boolean;
} {
  return {
    "has-text-centered": alignment === HORIZONTAL_ALIGNMENT.CENTER,
    "has-text-right": alignment === HORIZONTAL_ALIGNMENT.RIGHT,
    "has-text-left": alignment === HORIZONTAL_ALIGNMENT.LEFT
  };
}

function getContentAlign(
  alignment: HORIZONTAL_ALIGNMENT
): {
  "has-content-centered": boolean;
  "has-content-right": boolean;
  "has-content-left": boolean;
} {
  return {
    "has-content-centered": alignment === HORIZONTAL_ALIGNMENT.CENTER,
    "has-content-right": alignment === HORIZONTAL_ALIGNMENT.RIGHT,
    "has-content-left": alignment === HORIZONTAL_ALIGNMENT.LEFT
  };
}

export { getTextAlign, getContentAlign, getVerticalAlign };
