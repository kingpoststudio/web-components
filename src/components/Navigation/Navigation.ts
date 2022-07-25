import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles = css`
  :host {
    position: fixed;
    display: flex;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    z-index: 80;
    height: 5rem;
    background: white;
    box-shadow: 0 0.25rem 1rem #DDD, 0 0.5rem 1rem #EEE, 0 0.75rem 1rem #FFF;
  }

   ul {
    display: flex;
    margin: 0;
  }

   ul > li.hs-menu-depth-1 {
    position: relative;
    display: flex;
    align-items: items-end;
    margin: 1rem 0.5rem;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in-out;
  }

   ul > li.hs-menu-depth-1:hover {
    border-bottom: 2px solid #DDD;
  }

   ul > li.hs-menu-depth-1 > a,
   ul > li.hs-menu-depth-1 > span {
    font-weight: medium;
    text-transform: uppercase;
  }

   ul > li.hs-menu-depth-1 > ul {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 2rem;
    min-width: 10rem;
    background: white;
    opacity: 0;
    box-shadow: 0 0.25rem 1rem #DDD, 0 0.5rem 1rem #EEE, 0 0.75rem 1rem #FFF;
    list-style: none;
    overflow-y: hidden;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out, top 0.2s ease-in-out;
  }
    
                            /*
                             a {
                                @apply text-black hover:text-gbo-blue;
                                @apply transition-colors;
                            }
    
                            li.hs-menu-depth-2 {
                                @apply relative;
                                @apply w-max;
    
                                &.hs-item-has-children {
                                    > ul.hs-menu-children-wrapper {
                                        @apply flex;
                                        @apply flex-col;
                                        @apply mt-2;
                                        @apply space-y-1;
            
                                        > li.hs-menu-depth-3 {
                                            > a {
                                                @apply pl-4;
                                            }
                                        }
                                    }
                                }
    
                                &:last-child {
                                    &:before {
                                    }
    
                                    &.hs-item-has-children > ul.hs-menu-children-wrapper > li.hs-menu-depth-3 {
                                        &:before {
                                            content: "";
                                            @apply bg-none;
                                        }
                                    }
                                }
                            }
                        }
    
                        &:hover {
                            > ul.hs-menu-children-wrapper {
                                @apply !flex;
                                @apply visible;
                                @apply top-[calc(100%+2px)];
                                @apply opacity-100;
                                @apply pointer-events-auto;
    
                                li.hs-menu-depth-2 {
                                    @apply flex;
                                    @apply flex-col;
                                }
                            }
                        }
                    }
                } */
`;

@customElement('kps-nav')
export default class Navigation extends LitElement {
  static styles = styles;

  render() {
    return html`
      <nav>
        <slot name="main-menu"></slot>
      </nav>
    `;
  }
}
