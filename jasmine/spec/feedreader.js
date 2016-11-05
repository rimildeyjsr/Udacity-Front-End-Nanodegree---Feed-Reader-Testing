/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //tests if the url is defined and is not empty
        it('URL defined and URL is not empty',function(){
            for(feed in allFeeds){
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length > 0).toBe(true);
            }
        });


        //checks if name is defined and is not empty
        it('name defined and name is not empty',function(){
            for(feed in allFeeds){
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name.length > 0).toBe(true);
            }
        });
    });

    //menu test suite
    describe('The Menu',function(){
        //checks if the menu is hidden by default
        it('hidden menu by default', function(){

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //checks if the visibility of the menu is being toggled on click
        it('toggles visibility on click', function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    //initial entries test suite
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0,done);
        });
        //checks if there is even a single entry in the news feed
        it('has single entry', function(done){
            expect($('.feed .entry').length > 0).toBe(true);
            done();
        });
    });

    //news feed selection test suite
    describe('New Feed Selection',function(){
        var $feed,$newsfeed;
        beforeEach(function(done){
            //loads the first feed and stores it in $feed
            loadFeed(0, function(){
                $feed = $('.header-title').html();
                loadFeed(1, function(){
                    //loads another feed and stores it in $newfeed
                    $newfeed = $('.header-title').html();
                    done();
                });
            });
        });

        it('different feeds on reload', function(done){
            //checks if the new feed is equal to the old feed
            expect($feed).not.toEqual($newfeed);
            done();
        });

    });
}());