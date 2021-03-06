$(function() {
    $.timeago.settings.allowFuture = true;
    $.timeago.settings.allowPast = false;

    navigator.geolocation.getCurrentPosition(callAPI);

    function callAPI(position) {
        var coords = {
            "long": position.coords.longitude,
            "lat": position.coords.latitude,
        }
        $.get("api", coords).done(function(etds) {
            $("#location").text(etds[0].location);
        
            //populate times to departure
            $("tbody").empty();
            etds.forEach(function(etd) {
                var $tr = $("<tr>").append(
                    $("<td>").text(etd.destination),
                    $("<td>", {class:"timeago", title:etd.time_to_depart})
                );
                $("tbody").append($tr);
            });

            $(".timeago").timeago();
        });
    }
});
