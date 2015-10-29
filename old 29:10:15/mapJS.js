                //check login
                function checkLogin() {

                    if (sessionStorage.getItem('trekrlogin') !== "true" || sessionStorage.getItem('trekrlogin') === null) {
                        window.location = "login.html";
                    }

                };
                //maps jquery
                var map = null;

                function initMap() {
                    //set map
                    var dublin = new google.maps.LatLng(53.348244, -6.267938);
                    var mapOptions = {
                        center: dublin,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        zoom: 11
                    };

                    map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    //send userid via POST/AJAX to php file to get only markers of that user
                    var user = sessionStorage.getItem('trekrid');
                    var myData = {
                        userid: user
                    };
                    //Load Markers from the XML File
                    $.get("map_process.php", myData, function(data) {
                        $(data).find("marker").each(function() {
                            //Get values for the marker from the form
                            var point = new google.maps.LatLng(parseFloat($(this).attr('lat')), parseFloat($(this).attr('lng')));

                            //call create_marker() function for xml loaded maker
                            create_marker(point, false);
                        });
                    });

                };

                function initialize() {
                    //put marker on map
                    google.maps.event.addListener(map, 'click', function(e) {
                        var marker = new google.maps.Marker({
                            position: e.latLng,
                            map: map,
                            draggable: true, //set marker draggable 
                            animation: google.maps.Animation.DROP //bounce animation
                        });
                        //focus view on current marker
                        map.panTo(e.latLng);
                        //save marker
                        save_marker(marker);


                        //Content structure of info Window for the Markers
                        var content = $('<div class="marker-window">' +
                            '<div class="marker-window-inner"><span class="inf-content">' +
                            '<h1 class="marker-heading">New Marker!</h1>' +
                            'This is a new infoWindow on a marker' +
                            '</span>' +
                            '<br/><button id="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>' +
                            '</div></div>');



                        //Create infoWindow
                        var infowindow = new google.maps.InfoWindow();

                        //set the content to display
                        infowindow.setContent(content[0]);
                        //alert("test");

                        //add event listener which will open on click (touch??)        
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                        //delete marker
                        var deleteBtn = content.find('button#remove-marker')[0];
                        //alert("var delete button");
                        google.maps.event.addDomListener(deleteBtn, "click", function(event) {
                            remove_marker(marker);
                        });
                    });

                };

                //var map = null;
                function showlocation() {
                    // position request.
                    navigator.geolocation.getCurrentPosition(callback);
                };

                function callback(position) {

                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;

                    var latLong = new google.maps.LatLng(lat, lon);

                    var marker = new google.maps.Marker({
                        position: latLong,
                        map: map,
                        draggable: true, //set marker draggable 
                        animation: google.maps.Animation.DROP //bounce animation
                    });

                    var content = $('<div class="marker-window">' +
                        '<div class="marker-window-inner"><span class="inf-content">' +
                        '<h1 class="marker-heading">New Marker!</h1>' +
                        'This is a new infoWindow on a marker' +
                        '</span>' +
                        '<br/><button id="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>' +
                        '</div></div>');

                    //save marker
                    save_marker(marker);

                    //Create infoWindow
                    var infowindow = new google.maps.InfoWindow();

                    //set the content to display
                    infowindow.setContent(content[0]);
                    //alert("test");

                    //add event listener which will open on click (touch??)        
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    //delete marker
                    var deleteBtn = content.find('button#remove-marker')[0];
                    //alert("var delete button");
                    google.maps.event.addDomListener(deleteBtn, "click", function(event) {
                        remove_marker(marker);
                    });
                };


                function save_marker(Marker) {
                    //Save new marker using ajax
                    var mLatLang = Marker.getPosition().toUrlValue(); //get marker position
                    var user = sessionStorage.getItem('trekrid');
                    alert("save latlong: " + mLatLang);
                    var myData = {
                        latlang: mLatLang,
                        userid: user
                    };
                    $.ajax({
                        type: "POST",
                        url: "map_process.php",
                        data: myData,
                        success: function(data) {
                            //replaceWin.html(data); //replace info window with new html
                            Marker.setDraggable(false); //set marker to fixed
                            alert("save marker ajax call success");
                            //Marker.setIcon('http://PATH-TO-YOUR-WEBSITE-ICON/icons/pin_blue.png'); //replace icon
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(thrownError); //throw any errors
                        }
                    });
                };



                function remove_marker(Marker) {
                    var mLatLang = Marker.getPosition().toUrlValue(); //get marker position
                    var user = sessionStorage.getItem('trekrid');
                    alert("removal latlong: " + mLatLang);
                    var myData = {
                        del: 'true',
                        latlang: mLatLang,
                        userid: user
                    }; //post variables
                    $.ajax({
                        type: "POST",
                        url: "map_process.php",
                        data: myData,
                        success: function(data) {
                            Marker.setMap(null);
                            alert(data);
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(thrownError); //throw any errors
                        }
                    });

                };

                function create_marker(MapPos, DragAble) {
                    //new marker
                    var marker = new google.maps.Marker({
                        position: MapPos,
                        map: map,
                        draggable: DragAble,
                        animation: google.maps.Animation.DROP,
                    });

                    /*Content structure of info Window for the Markers for future ref
                    var contentString = $('<div class="marker-info-win">'+
                    '<div class="marker-inner-win"><span class="info-content">'+
                    '<h1 class="marker-heading">'+MapTitle+'</h1>'+
                    MapDesc+ 
                    '</span><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>'+
                    '</div></div>');    

                                    
                    //Create an infoWindow
                    var infowindow = new google.maps.InfoWindow();
                    //set the content of infoWindow
                    infowindow.setContent(contentString[0]);*/
                    var content = $('<div class="marker-window">' +
                        '<div class="marker-window-inner"><span class="inf-content">' +
                        '<h1 class="marker-heading">New Marker!</h1>' +
                        'This is a new infoWindow on a marker' +
                        '</span>' +
                        '<br/><button id="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>' +
                        '</div></div>');

                    //Create infoWindow
                    var infowindow = new google.maps.InfoWindow();

                    //set the content to display
                    infowindow.setContent(content[0]);
                    //alert("test");

                    //add event listener which will open on click (touch??)        
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    //delete marker
                    var deleteBtn = content.find('button#remove-marker')[0];
                    //alert("var delete button");
                    google.maps.event.addDomListener(deleteBtn, "click", function(event) {
                        remove_marker(marker);
                    });
                };

                function logout() {
                    sessionStorage.setItem("trekrlogin", false);
                    window.location = "login.html";

                };