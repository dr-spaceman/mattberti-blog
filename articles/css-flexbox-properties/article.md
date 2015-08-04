I've gotted so used to using CSS hacks like positioning and [floating](http://css.maxdesign.com.au/floatutorial/) over the years that it was at first hard for me to wrap my head around [CSS Flexboxes](https://drafts.csswg.org/css-flexbox-1). Here are the properties listed and explained along with some examples that helped me understand.<!--more-->

## Container properties

[`flex-flow`](https://drafts.csswg.org/css-flexbox-1/#flex-flow-property)
:  `<flex-direction> || <flex-wrap>`
:  Shorthand for setting the flex-direction and flex-wrap properties described below.

[`flex-direction`](https://drafts.csswg.org/css-flexbox-1/#flex-direction-property)
:  `row | row-reverse | column | column-reverse`

[`flex-wrap`](https://drafts.csswg.org/css-flexbox-1/#flex-wrap-property)
:  `nowrap | wrap | wrap-reverse`
:  Controls whether the flex container is single-line or multi-line, and the direction of the [cross-axis](https://drafts.csswg.org/css-flexbox-1/#cross-axis), which determines the direction new lines are stacked in.



`align-items`
:  `flex-start | flex-end | center | baseline | stretch`

<figure>
  <img alt="align-items" height="377" src="/images/flex-align.svg" width="508">
  <figcaption>An illustration of the five align-items keywords and their effects on a flex container with four colored items.</figcaption>
</figure>

## Flex Item (children) properties

[`order`](https://drafts.csswg.org/css-flexbox-1/#order-property)
:  `<integer>`

[`flex`](https://drafts.csswg.org/css-flexbox-1/#flex-property)
:  `initial | auto | none | [ <‘flex-grow’> <‘flex-shrink’>? || <‘flex-basis’> ]`
:  Default: `0 1 auto`
:  `initial` &rArr; `0 1 auto` -- Sizes the item based on the width/height properties. 
:  `auto` &rArr; `1 1 auto` -- Sizes the item based on the width/height properties, but makes them fully flexible, so that they absorb any free space along the main axis.
:  `none` &rArr; `0 0 auto` -- sizes the item according to the width/height properties, but makes the flex item fully inflexible. This is similar to initial, except that flex items are not allowed to shrink, even in overflow situations.
:  Specifies the components of a flexible length.
:  When a box is a flex item, `flex` is consulted instead of the main size property to determine the main size of the box.
:  Authors are encouraged to control flexibility using the `flex` shorthand rather than with its longhand properties directly (below), as the shorthand correctly resets any unspecified components to accommodate common uses^[[W3C Editor's Draft: CC Flexbox Module](https://drafts.csswg.org/css-flexbox-1/#flex-components)]

<figure>
  <figcaption>Milti-line flex containers with `flex: initial` and `flex: auto`:</figcaption>

```html
<div class="flex-container">
  <div>foo</div>
  <div>bar</div>
  <div>fuuu</div>
  <div>baaa</div>
</div>
<div class="flex-container flexlines--width-auto">
  <div>foo</div>
  <div>bar</div>
  <div>fuuu</div>
  <div>baaa</div>
</div>
```
```css
.flex-container {
  display: flex;
  flex-flow: row wrap;
  width: 200px;
  background-color: black;
  padding: 0 0 5px 5px
}

.flex-container > * {
  flex: initial;
  min-width: 50px;
  margin: 5px 5px 0 0;
  background-color: pink;
  color: black;
}

.flexlines--width-auto > * {
  flex: auto;
}
```
  <div class="figure">
    <div class="fig--flex-container">
      <div>foo</div>
      <div>bar</div>
      <div>fuuu</div>
      <div>baaa</div>
    </div>
    <div class="fig--flex-container flexlines--width-auto">
      <div>foo</div>
      <div>bar</div>
      <div>fuuu</div>
      <div>baaa</div>
    </div>
  </div>
</figure>

`flex-grow`
:  `<number>`
:  Default: `1`
:  Determines how much the flex item will grow relative to the rest of the flex items in the flex container.

`flex-shrink`
:  `<number>`
:  Default: `1`
:  Determines how much the flex item will shrink relative to the rest of the flex items in the flex container when negative free space is distributed.
:  By default, flex items won’t shrink below their minimum content size (the length of the longest word or fixed-size element). To change this, set the `min-width` or `min-height` property.

`flex-basis`
:  `auto | content | <width>`
:   The initial main size of the flex item.

<figure>
  <img height="240" src="/images/rel-vs-abs-flex.svg" width="504">
  <figcaption>A diagram showing the difference between "absolute" flex (starting from a basis of zero) and "relative" flex (starting from a basis of the item’s content size). The three items have flex factors of `1`, `1`, and `2`, respectively: notice that the item with a flex factor of `2` grows twice as fast as the others.</figcaption>
</figure>

## Aligning

### Aligning with `auto` margins

One use of auto margins in the main axis is to separate flex items into distinct "groups". The following example shows how to use this to reproduce a common UI pattern - a single bar of actions with some aligned on the left and others aligned on the right.

<a class="jsbin-embed" href="http://jsbin.com/juxigi/embed?html,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.34.1"></script>

### `justify-content`



## Examples

Using `order` to manipulate visual presentation while leaving source order intact. The Article is given a `min-width` value while the side content, Nav and Aside, are fixed. A media query arranges content into columns on small screens.

<iframe width="100%" height="300" src="//jsfiddle.net/mrberti/c7t0fbb8/3/embedded/result,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<style type="text/css">
.fig--flex-container {
  display: flex;
  flex-flow: row wrap;
  width: 200px;
  background-color: black;
  padding: 0 0 5px 5px
}

.fig--flex-container > * {
  min-width: 50px;
  margin: 5px 5px 0 0;
  background-color: pink;
  color: black;
}

.flexlines--width-auto > * {
  flex: auto;
}
</style>