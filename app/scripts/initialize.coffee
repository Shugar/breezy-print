validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
validatePages = /\W*(All|all)\W*|^(\s*\d+\s*\-\s*\d+\s*,?|\s*\d+\s*,?)+$/

$(document).ready ->
  $('.dropify').dropify({
     allowedFileExtensions: ['pdf', 'jpg', 'png']
  });

  $('.dropify')
    .change ->
      if $(this).val() != ''
        $('.stepOneButton').removeClass('button-disabled')

    .on 'dropify.afterClear', ->
      if $(this).val() == ''
        $('.stepOneButton').addClass('button-disabled')

  $('.firstScreen-input').on 'input', ->
    if $(this).val() == ''
      $('#btn-start-next').addClass('button-disabled')

    if $(this).val().match validateEmail
      $('#btn-start-next').removeClass('button-disabled')

  $('.secondScreen-printerInputValue').on 'input', ->
    $('.secondScreen-next').addClass('button-disabled')
    if $(this).val() != ''
      $('.secondScreen-next').removeClass('button-disabled')

  $('.secondScreen-form [type="text"]').on 'input', ->
    $('.secondScreen-print').addClass('button-disabled')
    if $(this).val() != ''
      $('.secondScreen-print').removeClass('button-disabled')

  $('.secondScreen-pagesToPrint').on 'input', ->
    $('.secondScreen-print').addClass('button-disabled')
    if $(this).val().match(validatePages)
      $('.secondScreen-print').removeClass('button-disabled')

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
