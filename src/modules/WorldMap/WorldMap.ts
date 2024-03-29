import {
  html, svg, unsafeCSS, LitElement,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './WorldMap.css';
import worldMap from '../../assets/images/world-map.png';

interface GeoSection {
  id: string;
  label: string;
  svgPoints: string;
  tagCoords: {
    x: number;
    y: number;
  }
}

const geoSections: GeoSection[] = [
  {
    id: 'tagaca',
    label: 'Tagaca - South America',
    svgPoints: '169.59 292.06 174.93 302.72 177.67 306.28 179.67 312.8 185.96 319 192.07 329.2 195.07 324.06 178.48 299.76 179.07 294.43 182.33 295.02 186.19 300.35 187.19 305.09 198.63 315.17 198.63 319 210.48 334.13 212.85 341.24 219.96 348.94 236.56 354.87 247.81 354.87 252.56 359.02 263.81 364.94 269.15 364.94 274.48 377.39 294.04 388.06 301.74 388.06 303.34 400.44 298.19 406.43 289.3 418.87 290.48 435.46 301.74 451.46 308.26 468.65 323.67 480.5 323.67 508.94 314.19 558.72 315.33 574.35 313.97 585.81 309.44 594.28 309.44 617.39 317.15 631.61 327.81 636 339.67 636 344.41 630.8 335.52 629.83 330.78 619.76 336.39 607.19 344.41 597.24 336.7 592.5 344.41 586.57 349.74 575.09 355.44 563.39 364.56 562.28 374.04 552.8 374.04 546.28 387.67 539.17 391.63 526.57 401.3 517.24 401.3 506.57 427.96 492.94 432.11 479.31 432.11 462.13 442.78 450.87 446.93 436.65 442.78 430.13 427.96 422.65 413.74 423.24 395.37 409.98 388.26 397.54 381.74 391.61 363.37 383.31 355.67 380.35 352.11 373.83 341.59 376.61 329.19 370.87 317.15 370.87 305.3 381.54 291.48 380.07 282.74 372.61 283.37 357.24 275.67 353.09 266.78 353.69 268.56 340.06 272.7 335.31 272.11 329.98 258.89 332.94 257.3 342.24 244.26 344.2 235.96 333.54 236.74 319 228.63 312.98 221.15 300.94 214.63 305.09 206.33 292.06 199.22 294.43 192.3 296.2 178.48 287.31 169.59 292.06',
    tagCoords: {
      x: 10,
      y: 70,
    },
  },
  {
    id: 'triolab',
    label: 'Triolab Group - Denmark, Finland, Iceland, Norway, Sweden, Estonia, Latvia, Lithuania',
    svgPoints: '488.56 143.61 482.78 131.17 485.67 128.06 491.22 128.06 493.44 132.5 497 130.28 506.78 128.06 510.78 128.06 513.89 131.61 516.44 130.5 584.67 151.94 588.56 150.28 590.78 145.83 600 143.17 600 138.28 613 118.28 613 108.94 622.33 105.83 628.11 102.72 636.11 102.72 646.78 96.94 663.67 96.94 666.78 101.39 658.33 112.5 661.44 118.72 660.11 124.94 661.44 135.61 666.78 145.39 666.78 150.28 656.11 160.5 655.22 166.28 655.67 181.83 650.78 184.94 642.78 182.72 634.44 182.86 626.7 177.89 618.78 184.94 610.33 188.94 600 196.94 593 196.94 590.33 187.61 590.33 176.06 583.22 172.94 580.56 167.17 582.78 157.39 517.44 136.94 506.78 139.61 502.78 144.5 488.56 143.61',
    tagCoords: {
      x: 20,
      y: 20,
    },
  },
  {
    id: 'iab',
    label: 'IAB - Czech Republic, Slovak Republic, Hungary and Poland',
    svgPoints: '613 196.94 620.56 192.06 633.89 189.83 640.11 193.39 642.33 210.28 638.33 216.5 638.33 224.5 633.89 229.39 624.56 231.17 615.67 220.06 609.44 220.5 605 212.5 612.56 206.28 613 196.94',
    tagCoords: {
      x: 30,
      y: 25,
    },
  },
  {
    id: 'atc',
    label: 'ATC Healthcare - Turkey',
    svgPoints: '650.78 262.24 646.63 254.54 655.52 249.8 660.26 256.02 676.85 249.8 689.3 256.02 699.37 252.76 708.26 258.69 708.26 271.13 699.37 273.5 681.59 273.5 673.3 276.46 666.78 272.91 662.04 276.46 650.78 269.35 650.78 262.24',
    tagCoords: {
      x: 35,
      y: 39,
    },
  },
  {
    id: 'p4ml',
    label: 'P4ML - United Arab Emirates and Kingdom of Saudi Arabia',
    svgPoints: '677.44 308.06 685.15 302.13 688.11 293.83 697 293.83 703.52 300.94 721.89 305.69 730.19 315.17 733.15 322.28 742.63 322.28 749.15 315.17 752.7 319 750.33 324.65 744.41 329.98 747.37 337.09 735.52 341.24 726.63 341.24 718.33 350.13 708.26 347.17 703.52 350.13 692.26 335.31 692.26 328.2 677.44 308.06',
    tagCoords: {
      x: 13,
      y: 50,
    },
  },
  {
    id: 'jabrehoo',
    label: 'Jabrehoo - Mainland China',
    svgPoints: '810.78 260.06 829.74 252.94 834.48 247.02 830.93 238.72 840.41 235.76 840.41 231.17 849.3 231.17 854.04 221.54 864.7 228.65 864.7 240.8 873.59 240.8 881.89 249.8 894.93 249.8 908.56 255.31 918.63 249.8 927.52 249.8 934.04 244.65 934.04 240.8 942.33 238.13 953 233.98 961.89 231.17 961.89 226.87 947.07 223.91 947.67 217.39 955.37 217.39 964.85 206.13 961.3 200.8 969.59 196.94 980.26 204.94 986.19 217.39 995.67 224.5 1007.52 224.5 1007.52 234.57 995.67 239.31 995.67 249.8 990.33 254.13 980.85 253.54 976.7 260.06 967.22 263.13 966.63 255.31 962.48 255.91 951.81 267.17 957.15 271.91 963.07 269.54 969 271.91 956.56 280.8 963.67 293.83 963.07 298.57 964.85 303.91 961.89 310.43 954.78 314.57 954.78 321.98 941.15 328.8 926.93 334.72 916.85 334.72 911.52 327.61 900.26 328.8 894.93 332.35 887.22 324.65 889 315.17 881.89 303.91 875.96 302.13 870.63 309.24 860.56 306.87 855.22 309.24 835.07 299.17 825.59 293.83 827.96 287.31 832.7 281.39 829.74 276.46 822.04 276.46 816.7 273.69 810.78 260.06',
    tagCoords: {
      x: 50,
      y: 40,
    },
  },
  {
    id: 'camtech',
    label: 'Camtech Diagnostics - Singapore, Malaysia, Japan',
    svgPoints: '1026.78 249.8 1032.11 242.28 1032.11 236.06 1047.22 242.93 1047.22 249.8 1037 253.83 1033.89 265.83 1026.78 276.46 1007.52 290.28 1000.67 292.33 957.46 348.44 950.22 388.83 958.44 393.94 955 397.81 944.11 400.5 935.33 409.28 921.89 412.72 903.22 407.61 892.56 397.83 892.56 384.5 904.11 393.39 904.11 402.5 921.55 407.21 929.11 406.5 934.7 401.25 938.35 395.52 942.6 395.25 945.89 388.06 954 346.39 961.44 337 994.11 294.39 998.33 281.39 1012.56 276.46 1025.89 265.83 1026.78 249.8',
    tagCoords: {
      x: 43.5,
      y: 43,
    },
  },
  {
    id: 'helixrus',
    label: 'HELiXrUS - Korea',
    svgPoints: '982.04 283.24 982.04 274.35 988.26 267.69 992.7 275.46 987.37 283.24 982.04 283.24',
    tagCoords: {
      x: 68,
      y: 41,
    },
  },
  {
    id: 'tgia',
    label: 'TGIA - Taiwan',
    svgPoints: '961.28 321.98 966.9 319 966.9 324.39 964.09 330.87 961.28 330.87 961.28 321.98',
    tagCoords: {
      x: 69,
      y: 49,
    },
  },
];

@customElement('kps-world-map')
class WorldMap extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: String })
  private activeSectionId = '';

  constructor() {
    super();
    this.renderSectionInfo = this.renderSectionInfo.bind(this);
  }

  toggleVisibleTag(e: any) {
    const el = e.target as SVGGElement;
    const sectionId = el.getAttribute('id');
    const tag = this.shadowRoot?.querySelector(`.tags [data-id="${sectionId}"]`);
    if (!tag) return;

    if (tag?.classList.contains('visible')) tag.classList.remove('visible');
    else tag?.classList.add('visible');
  }

  flashInfoContainer() {
    this.shadowRoot?.querySelector('.info-container')?.classList.remove('visible');
    setTimeout(() => {
      this.shadowRoot?.querySelector('.info-container')?.classList.add('visible');
    }, 150);
  }

  setActiveSection(e: any) {
    const el = e.target as SVGGElement;
    const sections = this.shadowRoot?.querySelectorAll('svg g > .section-outline');
    sections?.forEach((section) => section.classList.remove('active'));

    this.activeSectionId = el.parentElement?.getAttribute('id') || '';
    el.classList.add('active');
    this.flashInfoContainer();
  }

  renderSectionInfo(section: GeoSection) {
    if (this.activeSectionId === section.id) return html`<slot name="${section.id}"></slot>`;
    return html``;
  }

  render() {
    return html`
      <div class="wrap">

        <div class="info-container visible">
          ${!this.activeSectionId ? html`<slot name="default"></slot>` : geoSections.map(this.renderSectionInfo)}
        </div>

        <div class="map">
          <img src="${worldMap}" alt="World Map" />
          <svg viewBox="0 0 1200 640">
            ${geoSections.map((section) => (svg`<g id="${section.id}" @click=${this.setActiveSection} @mouseenter=${this.toggleVisibleTag} @mouseleave=${this.toggleVisibleTag}><polygon class="section-outline" points="${section.svgPoints}"/>)</g>`))}
          </svg>

          <div class="tags">
            ${geoSections.map((section) => (html`<div class="tag" style="left:${section.tagCoords.x}%;top:${section.tagCoords.y}%;" data-id="${section.id}">${section.label}</div>`))}
          </div>
        </div>

      </div>
    `;
  }
}

export default WorldMap;
