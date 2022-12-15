import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

// we need unique name for variation
// and the id for the category Book Reviews

const VARIATION_NAME     = 'book-reviews';
const REVIEW_CATEGORY_ID = 26;

const isBookReviewsVariation = ( props ) => {
    const {
        attributes:{namespace}
     } = props;
     return namespace && namespace === VARIATION_NAME;
};

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
// Create component to hold the review rating.
// Actually you are creating the component Book Review, including the Select Controls for the rating? 

const StarRating = ( { props: {
	attributes,
	setAttributes
} } ) => {
	const { query } = attributes;

	return (
		<PanelBody title="Book Review">
			<SelectControl
				label="Rating"
				value={ query.starRating }
				options={ [
					{ value: '', label: '' },
					{ value: 1,  label: "1 Star" },
					{ value: 2,  label: "2 Stars" },
					{ value: 3,  label: "3 Stars" },
					{ value: 4,  label: "4 Stars" },
					{ value: 5,  label: "5 Stars" }
				] }
				onChange={ ( value ) => {
					setAttributes( {
						query: {
							...query,
							starRating: value
						}
					} );
				} }
			/>
		</PanelBody>
	);
};

export const withBookReviewControls = ( BlockEdit ) => ( props ) => {

	return isBookReviewsVariation( props ) ? (
		<>
			<BlockEdit {...props} />
			<InspectorControls>
				<StarRating props={props} />
			</InspectorControls>
		</>
	) : (
		<BlockEdit {...props} />
	);
};

addFilter( 'editor.BlockEdit', 'core/query', withBookReviewControls );

