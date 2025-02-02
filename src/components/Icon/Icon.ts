import { getProperty, add, addStyle } from '@utils/dom';
import { icons } from '@assets/icons/index';
import IconStyle from './IconStyle';

interface setSvgProps {
  name: string;
}

interface replaceSvgStringAttributesProps {
  svgString: string;
}

class Icon extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.attachShadow({ mode: 'open' });
    const name = getProperty({ target: this, name: 'name' });
    if (name) this.setSvg({ name });
    addStyle({ target: this, style: new IconStyle({ target: this }).element });
  }

  async setSvg({ name }: setSvgProps) {
    let svgString: string = icons[name];
    if (!svgString) return;
    svgString = this.replaceAttributes({ svgString });
    if (this.shadowRoot)
      add({
        target: this.shadowRoot,
        template: svgString,
      });
  }

  replaceAttributes({ svgString }: replaceSvgStringAttributesProps) {
    const defaultSize = 24;
    const size = getProperty({ target: this, name: 'size' });
    const width = getProperty({ target: this, name: 'width' });
    const height = getProperty({ target: this, name: 'height' });
    const fill = getProperty({ target: this, name: 'fill' });

    let result = svgString
      .replace(/width=".*?"/g, `width="${width ?? size ?? defaultSize}"`)
      .replace(/height=".*?"/g, `height="${height ?? size ?? defaultSize}"`);

    const hasFill = this.hasAttribute('fill');
    if (hasFill) result = result.replace(/fill=".*?"/g, `fill="${fill}"`);

    return result;
  }
}

export default Icon;
