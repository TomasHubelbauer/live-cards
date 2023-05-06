# Live Cards

This repository hosts a site layout idea I've come up with and wanted to design
and see how it turns out.

The layout is a set of rows with cards sitting in them and the rows sliding in
alternate dimensions.
When a row is however, it ceases to scroll, pinning the hovered card/tile and
allowing the user to inspect the content better and make the choice to click to
open the given post.

The rows are virtualized so new cards appear at the start/end and the sliding
never causes the row to run out of content.
The amount of rows is such that each item is presented at least once so the
built-in browser search functionality works as expected.

The cards/tiles in the rows are assigned randomly.

The idea of this type of organization of information so to avoid presenting
content that is meant to be on a spectrum ranging from one-off never to be
touched again notes to evergreen posts in a chronological order which brands
the content with implicit ranking.

This type of layout should fight against the user's recency bias and present
all of the content with the same standing, drawing attention to the content's
data (such as the title and the description) over its metadata (like when it
was authored or even who authored it when deployed to a multi-author site).

This is what it looks like:

<video src="demo.mp4"></video>

## Shortcomings

There is a high amount of repetition when the amount of content that can be
offered is low.
This layout works best when there is at least a hundred pieces of content to
present or when it is tweaked to make the cards/tiles larger.
