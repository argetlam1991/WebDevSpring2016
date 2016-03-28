/**
 * Created by guhan on 3/27/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldDialogController", FieldDialogController);
    
    function FieldDialogController($scope, $modalInstance, field) {
        $scope.field = field;
        $scope.ok = ok;
        $scope.cancel = cancel;
        $scope.decodeOptions = decodeOptions;
        $scope.encodeOptions = encodeOptions;
        $scope.label = field.label;



        if (field.hasOwnProperty("placeholder")) {
            $scope.text = field.placeholder;
        }
        if (field.hasOwnProperty("options")) {
            $scope.textArea = decodeOptions(field.options);
        }

        
        function ok(){
            if (field.type == "TEXT" || field.type == "TEXTAREA") {
                field.label = $scope.label;
                field.placeholder = $scope.text;
            } else if (field.type == "DATE") {
                field.label = $scope.label;
            } else {
                field.label = $scope.label;
                field.options = encodeOptions($scope.textArea);
            }
            $modalInstance.close(field);
        };
        
        function cancel() {
            $modalInstance.dismiss('cancel');
        };

        function decodeOptions(options) {
            var res = "";
            for(var i = 0; i< options.length; i++) {
                var option = options[i];
                res += option.label;
                res += ":";
                res += option.value;
                res += "\n";
            }
            return res;
        }

        function encodeOptions(text) {
            var options = [];
            var lines = text.split("\n");
            for(var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var option = {};
                var attriputes = line.split(":");
                option.label = attriputes[0];
                option.value = attriputes[1];
                options.push(option);
            }
            return options;

        }
    }
    
})();