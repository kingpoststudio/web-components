import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { animate } from '../../lib/animate';

@customElement('kps-carousel')
export default class Carousel extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    ::slotted([slot="items"]) {
      display: flex;
      grid-gap: var(--space-sm);
    }

    .items {
      overflow: hidden;
      overflow-x: scroll;
      padding: 5px var(--space-md) 77px;
      display: flex;
      padding-left: var(--scroller-pad-left, var(--space-md));
      padding-right: var(--scroller-pad-right, var(--space-md));
    }

    .items::-webkit-scrollbar {
      display: none;
    }

    @media screen and (min-width: 920px) {
      ::slotted([slot="items"]) {
        grid-gap: var(--space-lg);
      }

      .items[fade="true"] {
        padding-bottom: 120px;
        margin-bottom: -50px;
      }
    }

    @media screen and (min-width: 1200px) {
      .items[fade="false"] {
        overflow: visible;
        padding: 0 0 56px;
      }

      .items[fade="false"] ::slotted([slot="items"]) {
        max-width: 100%;
      }
    }
  `;

  itemsEl: HTMLElement | null = null;

  itemsElements: HTMLElement[] = [];

  wrapRef = createRef<HTMLElement>();

  itemsRef = createRef<HTMLSlotElement>();

  firstUpdated() {
    setTimeout(() => {
      try {
        this.itemsEl = this.renderRoot?.querySelector('.items') as HTMLElement;
        const slot = this.itemsRef.value;
        console.log(slot);

        if (!slot) {
          console.error('scrolling could not find slot');
          return;
        }

        const itemsSlot = slot
          .assignedNodes()
          .find(
            (itemSlot) => (itemSlot as HTMLSlotElement).name === 'items',
          ) as HTMLSlotElement;

        const itemSlotNode = itemsSlot.assignedNodes()[0] as
          | HTMLElement
          | undefined;
        const items = itemSlotNode?.querySelectorAll('nine-card') ?? [];

        this.itemsElements = Array.from(items) as HTMLElement[];
        this.itemsEl?.addEventListener('scroll', this.handleScroll);
        window?.addEventListener('resize', this.handleScroll, {
          passive: true,
        });
        this.handleScroll();

        // eslint-disable-next-line no-undef
        this.addEventListener('scrollDir', this.scrollDir as EventListener);
      } catch (error) {
        console.error(error);
      }
    }, 0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.itemsEl?.removeEventListener('scroll', this.handleScroll);
    window?.removeEventListener('resize', this.handleScroll);
    // eslint-disable-next-line no-undef
    this.removeEventListener('scrollDir', this.scrollDir as EventListener);
  }

  handleScroll = (): void => {
    const itemsElOffsetLeft = this.getBoundingClientRect().left ?? 0;
    // const wrapDistanceLeft =
    //   this.wrapRef.value?.getBoundingClientRect().left ?? 0;
    // console.log(wrapDistanceLeft);

    this.itemsElements.forEach((el) => {
      if (itemsElOffsetLeft === 0 || this.fade === 'false') {
        el.style.setProperty('--item-opacity', '1');
        return;
      }

      // get element position on page
      const pos = el.getBoundingClientRect().left - itemsElOffsetLeft;
      const min = this.fadeOutPos;
      const max = this.fadeInPos;
      const percentPos = (pos - min) / (max - min);
      el.style.setProperty('--item-opacity', `${percentPos}`);
    });
  };

  @property({ type: Number })
    fadeInPos = 450;

  @property({ type: Number })
    fadeOutPos = 230;

  @property({ type: String })
    fade = 'true';

  scrollDir = (event: CustomEvent): void => {
    const dir = parseInt(`${event.detail ?? 1}`, 10);
    const scrollLeft = this.itemsEl?.scrollLeft ?? 0;
    const scrollStep = this.itemsElements[1].offsetLeft - this.itemsElements[0].offsetLeft;
    const newScrollLeft = scrollLeft + dir * scrollStep;

    animate(
      600,
      (i) => {
        if (this.itemsEl) this.itemsEl.scrollLeft = i;
      },
      {
        range: [scrollLeft, newScrollLeft],
      },
    );
  };

  render() {
    return html`<div class="items" ${ref(this.wrapRef)} fade="${this.fade}">
      <slot name="items" ${ref(this.itemsRef)}></slot>
    </div>`;
  }
}
