import { Field, Label, Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ImageFilterForm({
  hasImages,
  setHasImages,
}: {
  hasImages: boolean;
  setHasImages: () => void;
}) {
  return (
    <Field as="div" className="flex items-center">
      <Label as="span" className="mr-3 text-sm">
        <span className="font-medium text-gray-900">Has Images</span>
      </Label>
      <Switch
        checked={hasImages}
        onChange={setHasImages}
        className={classNames(
          hasImages ? "bg-button_blue" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-button_blue focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            hasImages ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Field>
  );
}
