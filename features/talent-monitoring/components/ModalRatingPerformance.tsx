import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DialogAction from "@/components/common/dialog-action";
import { InputRating } from "@/components/common/input-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/common/input-field";

import useTalentMonitoring from "@/stores/talent-monitoring";
import useTheme from "@/stores/theme";
import {
  useTalentInformation,
  useUpdatePerformance,
  usePerformance,
} from "../hooks/useTalentMonitoring";
import { UpdatePerformanceSchema } from "../schemas/talent-monitoring.schema";

interface IModalRatingPerformanceProps {
  id: string;
}

function ModalRatingPerformance({
  id,
}: Readonly<IModalRatingPerformanceProps>) {
  // variables
  const form = useForm<z.infer<typeof UpdatePerformanceSchema>>({
    resolver: zodResolver(UpdatePerformanceSchema),
    defaultValues: {
      note: "",
    },
  });
  const [ratings, setRatings] = useState<{
    softskills: number;
    hardskills: number;
  }>({
    softskills: 0,
    hardskills: 0,
  });
  const { data } = useTalentInformation(id);
  const { refetch: refetchPerformance } = usePerformance(id);
  const updatePerformance = useUpdatePerformance();
  const {
    modalRatingPerformance,
    selectedPerformance,
    toggleModalRatingPerformance,
    setSelectedPerformance,
  } = useTalentMonitoring();
  const { setModalSuccess } = useTheme();

  // functions
  const handleClose = () => {
    toggleModalRatingPerformance(false);
    setSelectedPerformance(null);
  };

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const onSubmit = async (values: z.infer<typeof UpdatePerformanceSchema>) => {
    try {
      const data = {
        note: values.note,
        softskill: ratings.softskills,
        hardskill: ratings.hardskills,
      };
      const res = await updatePerformance.mutateAsync({
        id: selectedPerformance?.id || 0,
        data,
      });
      if (res.status === "success") {
        setModalSuccess({
          open: true,
          title: "Thank You for Your Feedback!",
          message:
            "Performance review has been successfully submitted. We appreciate your input",
          actionVariant: "default",
          actionMessage: "Back",
          action: () => {
            refetchPerformance();
            handleClose();
          },
          animation: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <DialogAction
      isOpen={modalRatingPerformance}
      onClose={handleClose}
      title={"Rate Performance"}
      className="max-w-full md:max-w-sm"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 my-4 w-full"
        >
          <Avatar className={"w-20 h-20"}>
            <AvatarImage
              src={data?.data?.photo || "/images/unavailable-profile.webp"}
              alt="avatar"
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback />
          </Avatar>
          <InputRating
            name="softskills"
            label="Soft Skills"
            value={ratings.softskills}
            onChange={(value) => handleRatingChange("softskills", value)}
            className="w-full"
          />
          <InputRating
            name="hardskills"
            label="Hard Skills"
            value={ratings.hardskills}
            onChange={(value) => handleRatingChange("hardskills", value)}
            className="w-full"
          />
          <div className="w-full">
            <InputField
              name="note"
              label="Notes"
              primary
              control={form.control}
              render={({ field }) => (
                <Input placeholder="e.g. Good Job" {...field} />
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            loading={updatePerformance.isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}

export default ModalRatingPerformance;
