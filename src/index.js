import { registerBlockVariation } from '@wordpress/blocks';

// we need unique name for variation
// and the id for the category Book Reviews

const VARIATION_NAME     = 'book-reviews';
const REVIEW_CATEGORY_ID = 26;

registerBlockVariation( 'core/query',{
    name: VARIATION_NAME,
    title: 'Book Reviews',
    icon: 'book',
    description: 'Displays a list of book reviews',
    isActive: [ 'namespace' ],
    attributes: {
        namespace: VARIATION_NAME,
        query: {
            postType: 'post',
            perPage:    6,
            offset: 0,
            taxQuery: {
                category: [ REVIEW_CATEGORY_ID ]
            }
        },
        align: 'wide',
        displayLayout: {
            type: 'flex',
            colums: 3
        }
    },
    allowedControls: [ 'order','author' ],
    innerBlocks: [
          [   
            'core/post-template',
            {},
            [
                [ 'core/post-featured-image' ],
                [ 'core/post-title' ],
                [ 'core/post-excerpt' ]
            ], 
         ]
        ]
} );