/**
 * jspsych-html-form-checkbox
 * a jspsych plugin for making html checkbox forms
 * 
 * Christian Brickhouse
 *
 */

jsPsych.plugins['html-form-checkbox-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-form-checkbox-response',
    description: '', // TODO
    parameters: {
      html: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'HTML',
        default: null,
        description: 'HTML formatted string containing all the input elements to display. If provided, all other arguments are ignored.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: '',
        description: 'A string to use as the prompt'
      },
      options: {
        type: jsPsych.plugins.parameterType.OBJECT,
        pretty_name: 'Options',
        default:  [],
        description: 'An array of question objects.'
      },
      standalone: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Standalone trial',
        default: false,
        description: 'NotYetImplemented: By default the plugin does not produce `<form>` tags. If this is set to true, the plugin will wrap the output in a `<form>` tag and end the trial on form submission.' 
      }
    }
  }
  
  function parse_options(options) {
    var ret = [];
    for (var i = 0; i < options.length; i++) {
        Opt = options[i];
        var html = '<div class="form-checkbox-label"><label for="'+Opt.name+'">'  +
            '<input type="checkbox" class="input-checkbox-option" name="'+Opt.name+'" /> ' +
            '<span>'+Opt.label+'</span>'+
            '</label></div>';
        ret.push(html)
    }
    return ret;
  }

  plugin.trial = function(display_element, trial) {   
    if (trial.html !== null) {
        display_element.innerHTML = trial.html;
    } else {
        var html = '';
        // Show prompt
        if(trial.prompt !== null){
          html += '<div class="jspsych-html-form-checkbox-prompt">'+trial.prompt+'</div>';
        }
        
        // Convert option objects to list of HTML snippets then concatenate
        options = parse_options(trial.options);
        html += options.join('');
            
        // Add checkboxes to DOM
        display_element.innerHTML = html;
    }
  };

  return plugin;
})();
