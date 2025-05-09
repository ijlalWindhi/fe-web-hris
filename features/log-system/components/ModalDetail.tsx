/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode } from "react";
import DialogAction from "@/components/common/dialog-action";
import useLogSystem from "@/stores/log-system";

export default function ModalDetail() {
  // variables
  const {
    modalLogSystem,
    selectedData,
    setSelectedData,
    toggleModalLogSystem,
  } = useLogSystem();

  // functions
  const handleClose = (): void => {
    toggleModalLogSystem(false);
    setSelectedData(null);
  };

  const findDifferences = (
    obj1: Record<string, any>,
    obj2: Record<string, any>,
  ): Record<string, boolean> => {
    const differences: Record<string, boolean> = {};

    // Check all keys in obj1
    for (const key in obj1) {
      // Check if values are different
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        differences[key] = true;
      }
    }

    // Check for keys in obj2 that aren't in obj1
    for (const key in obj2) {
      if (!(key in obj1)) {
        differences[key] = true;
      }
    }

    return differences;
  };

  // Function to render JSON with highlighted differences
  const renderHighlightedJson = (
    json: Record<string, any> | null,
    otherJson: Record<string, any> | null,
  ): ReactNode => {
    if (!json || !otherJson) return JSON.stringify({}, null, 2);

    const differences: Record<string, boolean> = findDifferences(
      json,
      otherJson,
    );

    // Convert JSON to string with indentation
    const jsonString: string = JSON.stringify(json, null, 2);

    // Split the string into lines
    const lines: string[] = jsonString.split("\n");

    // Process each line to add highlighting
    return lines.map((line: string, index: number) => {
      // Check if this line contains a key with different values
      for (const key in differences) {
        // Simple regex to match key in the line
        const keyPattern: RegExp = new RegExp(`"${key}":\\s`);
        if (keyPattern.test(line)) {
          return (
            <div key={index} className="bg-yellow-100 -mx-4 px-4">
              {line}
            </div>
          );
        }
      }

      return <div key={index}>{line}</div>;
    });
  };

  // Check if we have valid data
  const canCompare: boolean =
    !!selectedData?.data_before &&
    !!selectedData?.data_after &&
    typeof selectedData.data_before === "object" &&
    typeof selectedData.data_after === "object";

  return (
    <DialogAction
      isOpen={modalLogSystem}
      onClose={handleClose}
      title={"Detail Log Sistem"}
      className="max-w-full md:max-w-5xl"
    >
      <div className="max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="font-semibold text-sm text-center">
              Data Sebelum
            </div>
            <div className="border rounded bg-gray-50 p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-gray-700">
                  {/* {canCompare
                    ? renderHighlightedJson(
                        selectedData?.data_before as Record<string, any>,
                        selectedData?.data_after as Record<string, any>,
                      )
                    : JSON.stringify(selectedData?.data_before || {}, null, 2)} */}
                  {JSON.stringify(selectedData?.data_before || {}, null, 2)}
                </code>
              </pre>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-sm text-center">
              Data Setelah
            </div>
            <div className="border rounded bg-gray-50 p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-gray-700">
                  {/* {canCompare
                    ? renderHighlightedJson(
                        selectedData?.data_after as Record<string, any>,
                        selectedData?.data_before as Record<string, any>
                      )
                    : JSON.stringify(selectedData?.data_after || {}, null, 2)} */}
                  {JSON.stringify(selectedData?.data_after || {}, null, 2)}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </DialogAction>
  );
}
