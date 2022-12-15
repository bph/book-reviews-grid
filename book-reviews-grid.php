<?php
/**
 * Plugin Name:       Book Reviews Grid
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Follwing the tutorial Query Loop Variations at developer.wordpress.org/news
 */


 add_action( 'enqueue_block_editor_assets', 'bookgrid_assets' );

 function bookgrid_assets() {

    //Get plugin directory and URL paths
    $path = untrailingslashit( __DIR__ );
    $url  = untrailingslashit( plugins_url( '', __FILE__ ) );

    // Get auto-generated asset file
    $asset_file = "{$path}/build/index.asset.php";

    // If aset file exists, get its data and enqueue script
    if ( file_exists( $asset_file ) ) {
        $asset = include $asset_file;

        wp_enqueue_script(
            'book-reviews-variation',
            "{$url}/build/index.js",
            $asset['dependencies'],
            $asset['version'],
            true
        );
    }
};

add_filter( 'rest_post_query','bookgrid_rest_book_reviews',10,2 );

function bookgrid_rest_book_reviews( $args, $request ){
    
    $rating = $request->get_param( 'starRating' );
        
        if ( $rating ) {
            $args['meta_key'] = 'rating';
            $args['meta_value'] = absint($rating);
        }
        return $args;
}

add_filter( 'pre_render_block','bookgrid_pre_render_block',10,2 );

function bookgrid_pre_render_block( $pre_render, $parsed_block ){
    //Determine if this is the custom block variation

    if ( 'book-reviews' === $parsed_block['attrs']['namespace'] ) {
        add_filter( 'query_look_block_query_vars', function($query, $block ) use ( $parsed_block ) {
            //Add rating meta key/value pair if queried
            if ( $parsed_block['attrs']['query']['starRating'] ){
                $query['meta_key'] = 'rating';
                $query['meta_value'] = absint( $parsed_block['attrs']['query']['starRating']);
            }
            return $query;
        },10,2
    );
    }
    return $pre_render;
}