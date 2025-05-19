import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CommonForm = ({ onSubmit, formControls, formData, setFormData ,buttonText }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((formControl) => (
          <div className="flex flex-col gap-1" key={formControl.name}>
            <Label className="mb-1">{formControl.label}</Label>
            {/* for input Type */}

              {formControl.componentType === "input" && (
              <Input
                type={formControl.type}
                name={formControl.name}
                placeholder={formControl.placeHolder}
                id={formControl.name}
                value={formData[formControl.name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [formControl.name]: e.target.value,
                  })
                }
              />
            )}

         
             {/* for select type */}
            {formControl.componentType === "select" && (
              <Select
                name={formControl.name}
                value={formData[formControl.name]}
                onValueChange={(value) =>
                  setFormData({ ...formData, [formControl.name]: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={formControl.label} />
                </SelectTrigger>
                <SelectContent>
                  {formControl.options &&
                    formControl.options.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  
                </SelectContent>
              </Select>
            )}

                 {/* for textarea type */}

            {formControl.componentType === "textarea" && (
              <Textarea
                name={formControl.name}
                placeholder={formControl.placeHolder}
                rows="4"
                value={formData[formControl.name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [formControl.name]: e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}
      </div>
      <Button className="mt-4 w-full bg-blue-900">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
