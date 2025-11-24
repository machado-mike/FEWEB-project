/**
 * Render a character profile, move list, and character trailer
 * 
 * @param {*} frameData - Full move list data from TekkenDocs API
 * @param {*} info      - Local character info 
 * @param {*} youtubeId - YouTube trailer video ID
 * @returns             - Error if no data is found
 */
function showCharacter(frameData, info, youtubeId) {
  const $result = $("#result");

  // Remove previous search result
  $result.empty();

  //Show error if no data found
  if (!frameData && !info) {
    $result.html("<p>No character found.</p>");
    return;
  }

  //Character bio + image
  if (info) {
    const $charInfo = $("<div id='characterInfo'>");

    const $left = $("<div class='info-left'>");
    if (info.image) {
      $("<img>")
        .attr("src", info.image)
        .attr("alt", info.characterName)
        .appendTo($left);
    }

    const $right = $("<div class='info-right'>");
    $("<h3>").text(info.characterName).appendTo($right);
    $("<p>").html("<strong>Birthday:</strong> " + info.birthday).appendTo($right);
    $("<p>").html("<strong>Country:</strong> " + info.country).appendTo($right);
    $("<p>").html("<strong>Style:</strong> " + info.style).appendTo($right);
    $("<p>").text(info.bio).appendTo($right);

    $charInfo.append($left, $right);
    $result.append($charInfo);
  }

  //Move list 
  if (frameData.framesNormal.length > 0) {

    // Collapsible header
    const $header = $("<h3 class='collapsible'>")
      .html(`Move List (${frameData.framesNormal.length} moves) <span class="toggle-icon">▼</span>`);

    const $content = $("<div class='collapsible-content'>").hide();

    // Notations row 
    const $notations = $("<div class='notations'>");

    $notations.append(
      $("<div class='notation-item'>").append(
        $("<img class='notation-img'>")
          .attr("src", "assets/movement_notation.webp")
          .attr("alt", "Movement Notations"),
        $("<p>").text("Directional Inputs")
      ),

      $("<div class='notation-item'>").append(
        $("<img class='notation-img'>")
          .attr("src", "assets/basicattacks_notation.png")
          .attr("alt", "Button Notations"),
        $("<p>").text("Button Inputs")
      )
    );

    $content.append($notations);

    // Search bar
    const $search = $("<input type='text' id='move-search' placeholder='Search moves...'>");
    $content.append($search);

    // Move table
    const $table = $("<table class='move-table'>");
    const $thead = $(`
            <thead>
                <tr>
                    <th>#</th>
                    <th>Command</th>
                    <th>Name</th>
                    <th>Hit Level</th>
                    <th>Damage</th>
                    <th>Startup</th>
                    <th>On Hit</th>
                    <th>On Block</th>
                    <th>CH</th>
                    <th>Notes</th>
                </tr>
            </thead>
        `);

    const $tbody = $("<tbody id='move-table-body'>");

    frameData.framesNormal.forEach(move => {
      const $row = $("<tr>");
      $row.append(
        $("<td>").text(move.moveNumber),
        $("<td>").text(move.command || "-"),
        $("<td>").text(move.name || "-"),
        $("<td>").text(move.hitLevel || "-"),
        $("<td>").text(move.damage || "-"),
        $("<td>").text(move.startup || "-"),
        $("<td>").text(move.hit || "-"),
        $("<td>").text(move.block || "-"),
        $("<td>").text(move.counterHit || "-"),
        $("<td>").text(move.notes || "-")
      );
      $tbody.append($row);
    });

    $table.append($thead, $tbody);
    $content.append($table);

    // Add everything to the result
    $result.append($header, $content);

    // Collapsible logic
    $header.on("click", function () {
      $(this).toggleClass("active");
      $content.slideToggle();
      $(this).find(".toggle-icon").text(
        $(this).hasClass("active") ? "▲" : "▼"
      );
    });

    // Search filter
    $search.on("input", function () {
      const text = $(this).val().toLowerCase();
      $("#move-table-body tr").each(function () {
        $(this).toggle($(this).text().toLowerCase().includes(text));
      });
    });
  }

  //Youtube vid
  if (youtubeId) {
    const $ytBox = $("<div id='youtubeTrailer'>");
    const $iframe = $("<iframe>")
      .attr("width", 560)
      .attr("height", 315)
      .attr("src", `https://www.youtube.com/embed/${youtubeId}?mute=1`)
      .attr("title", "YouTube video player")
      .attr("allowfullscreen", true);

    $ytBox.append($iframe);
    $result.append($ytBox);
  }
}