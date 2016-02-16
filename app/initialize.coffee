$(document).ready ->

  Dropzone.autoDiscover = false;

  $(".firstScreen-dropzone").dropzone({
    url: "/file/post"
    autoProcessQueue: false
  });

  $('.stepOneButton').click ->
    $('.firstScreen-stepOne').hide()
    $('.firstScreen-stepTwo').show()

  $('.firstScreen-back').click ->
    $('.firstScreen-stepTwo').hide()
    $('.firstScreen-stepOne').show()

  $('.secondScreen-back').click ->
    $('#release').hide()
    $('#start').show()

  $('.secondScreen-printerChange').click ->
    $('.secondScreen-printerStepTwo').hide()
    $('.secondScreen-printerStepOne').show()
    $('.secondScreen-print').removeClass('secondScreen-printActive')
    $('.secondScreen-next').show()

  $('.secondScreen-next').click ->
    $('.secondScreen-printerStepOne').hide()
    $('.secondScreen-printerStepTwo').show()
    $(this).hide()
    $('.secondScreen-print').addClass('secondScreen-printActive')

  $('.secondScreen-cancel').click ->
    swal {
      title: 'Are you sure?'
      text: 'You will not be able to recover this document!'
      type: 'warning'
      showCancelButton: true
      confirmButtonColor: '#DD6B55'
      confirmButtonText: 'Yes, delete it!'
      closeOnConfirm: false
    }, ->
      swal {
        title: 'Deleted!',
        text: 'Your document has been deleted.',
        type: 'success'
      }, ->
        document.location = '/'

  $('#btn-start-next').click ->
    $('#start').hide()
    $('#release').show()
    $('#file-info').html $('#docUpload').val()

  $('#btn-release-next').click ->
    $.ajax
      dataType: 'json'
      url: 'endpoint?shortCode=' + $('#txt-shortcode').val()
      success: (data) ->
        $('#select-printer').hide()
        $('#set-printer-settings').show()
        $('#hid-endpointId').val data.endpoint_id
        $('#printer-name').html data.display_name
        $('#btn-release-next').hide()
        $('#btn-print').show()

  $('#btn-print-another').click ->
    document.location = '/'
    $(this).hide()

  $('form').ajaxForm success: ->
    $('#action-panel').hide()
    $('#print-another-panel').show()
