import { html } from 'lit';

export default {
  title: 'Resource View',
  component: 'kps-resource-view',
};

const topics = [
  { label: 'Test 1', slug: 'test-1' },
  { label: 'Test 2', slug: 'test-2' },
  { label: 'Test 3', slug: 'test-3' },
];

export const Standard = () => html`
  <kps-container>
    <kps-resource-view backurl="https://kps.com/blog">
      <p slot="type">Whitepaper</p>
      <h1 slot="title">Article header text lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h1>
      <p slot="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut perspiciatis unde omnis istpoe. Aenean euismod bibendum laoreet.</p>
      <img slot="image" src="https://picsum.photos/400/400" alt="Image alt text" />
      <div slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </kps-resource-view>
  </kps-container>
`;
