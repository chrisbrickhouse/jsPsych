/**
 * jspsych-html-form-checkbox
 * a jspsych plugin for making html checkbox forms
 * 
 * Christian Brickhouse
 *
 */

jsPsych.plugins['html-form-radiobutton'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-form-radiobutton',
    description: '', // TODO
    parameters: {
      html: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'HTML override',
        default: null,
        description: 'HTML formatted string containing all the input elements to display. If provided, all other arguments are ignored.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Prompt',
        default: '',
        description: 'An string to use as the prompt. Can also be HTML.'
      },
      group: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: "Button group name",
        default: undefined,
        description: "A name for this group of buttons."
      },
      options: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Response options',
        nested: {
            label: {
              type: jsPsych.plugins.parameterType.STRING,
              pretty_name: "Display text",
              default: "Radiobutton option",
              description: "The text to display as the radio button option."
            },
            element_id: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: "Response ID",
                default: null,
                description: "An HTML id for the response option"
            },
            value: {
              type: jsPsych.plugins.parameterType.STRING,
              pretty_name: "Value",
              default: undefined,
              description: "The value to record if option is checked."
            },
            checked: {
              type: jsPsych.plugins.parameterType.BOOLEAN,
              pretty_name: "Checked by default",
              default: false,
              description: "NotYetImplemented: If true, this option will be checked by default."
            }
        }
      },
      right: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: "Right align",
        default: false,
        description: "By default, buttons are on the left of the label. If this parameter is set to true, radio buttons appear to the right of the label.",
      },
      standalone: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Standalone trial',
        default: false,
        description: 'NotYetImplemented: By default the plugin does not produce `<form>` tags. If this is set to true, the plugin will wrap the output in a `<form>` tag and end the trial on form submission.' 
      }
    }
  }

  plugin.trial = function(display_element, trial) {   
    if (trial.html !== null) {
        display_element.innerHTML = trial.html;
    } else {
        var html = document.createElement('div');
        
        if(trial.prompt !== null){
          var prompt = document.createElement('div');
          prompt.setAttribute('class','jspsych-html-form-radiobutton-prompt');
          prompt.innerHTML = trial.prompt;
          html.appendChild(prompt);
        }
        
        for (var i = 0; i < trial.options.length; i++) {
            Opt = trial.options[i];
            
            if ( Opt.element_id === null ) {
              element_id = trial.group + i;
            } else {
              element_id = Opt.element_id
            }
            
            // Create div wrapper for option
            var wrapper = document.createElement('div');
            wrapper.setAttribute('class','form-radiobutton-wrapper');
            
            // Create label for option
            var label = document.createElement('label');
            label.setAttribute('for',element_id);
            label.innerHTML = Opt.label;
            
            // Create option's input element
            var input = document.createElement('input');
            input.setAttribute('type','radio');
            input.setAttribute('class','input-radiobutton-option');
            input.setAttribute('value',Opt.value);
            input.setAttribute('name',trial.group);
            input.setAttribute('id',element_id);
            
            // Add them all together
            if (trial.right) {
              wrapper.append(label);
              wrapper.append(input);
            } else {
              wrapper.appendChild(input);
              wrapper.appendChild(label);
            }
            html.appendChild(wrapper)
        }
            
        // Add radiobutons to DOM
        display_element.appendChild(html);
    }
  };

  return plugin;
})();
