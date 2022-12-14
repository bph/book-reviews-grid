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
    $url = untrailingslashit( plugins_url( '', __FILE__ ) );

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
