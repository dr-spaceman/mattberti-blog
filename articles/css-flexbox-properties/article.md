I've gotted so used to using CSS hacks like positioning and [floating](http://css.maxdesign.com.au/floatutorial/) over the years that it was at first hard for me to wrap my head around [CSS Flexboxes](https://drafts.csswg.org/css-flexbox-1). Here are the properties listed and explained along with some examples that helped me understand.<!--more-->

## Container properties

[`flex-direction`](https://drafts.csswg.org/css-flexbox-1/#flex-direction-property)
:  `row | row-reverse | column | column-reverse`

[`flex-wrap`](https://drafts.csswg.org/css-flexbox-1/#flex-wrap-property)
:  `nowrap | wrap | wrap-reverse`
:  Controls whether the flex container is single-line or multi-line, and the direction of the [cross-axis](https://drafts.csswg.org/css-flexbox-1/#cross-axis), which determines the direction new lines are stacked in.

[`flex-flow`](https://drafts.csswg.org/css-flexbox-1/#flex-flow-property)
:  `<flex-direction> || <flex-wrap>`
:  Shorthand for setting the flex-direction and flex-wrap properties described above.

## Flex Item (children) properties

[`order`](https://drafts.csswg.org/css-flexbox-1/#order-property)
:  `<integer>`

[`flex`](https://drafts.csswg.org/css-flexbox-1/#flex-property)
:  `none | [ <‘flex-grow’> <‘flex-shrink’>? || <‘flex-basis’> ]`
:  `none` &rArr; `0 0 auto`
:  Specifies the components of a flexible length.
:  When a box is a flex item, `flex` is consulted instead of the main size property to determine the main size of the box.
:  Authors are encouraged to control flexibility using the flex shorthand rather than with its longhand properties directly, as the shorthand correctly resets any unspecified components to accommodate common uses
`flex-grow`
:  `<number>`
:  Default: `1`
:  Determines how much the flex item will grow relative to the rest of the flex items in the flex container.

`flex-shrink`
:  `<number>`
:  Default: `1`
:  Determines how much the flex item will shrink relative to the rest of the flex items in the flex container when negative free space is distributed

`flex-basis`
:  `auto | content | <width>`
:   The initial main size of the flex item.

<figure>
  <img height="240" src="/images/rel-vs-abs-flex.svg" width="504">
  <figcaption>A diagram showing the difference between "absolute" flex (starting from a basis of zero) and "relative" flex (starting from a basis of the item’s content size). The three items have flex factors of `1`, `1`, and `2`, respectively: notice that the item with a flex factor of `2` grows twice as fast as the others.</figcaption>
</figure>


## Examples

Using `order` to manipulate visual presentation while leaving source order intact. The Article is given a `min-width` value while the side content, Nav and Aside, are fixed. A media query arranges content into columns on small screens.

<iframe width="100%" height="300" src="//jsfiddle.net/mrberti/c7t0fbb8/3/embedded/result,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
