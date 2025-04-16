"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChartSummary from "./ChartSummary";
import useAuth from "@/stores/auth";
import CardReminder from "./CardReminder";

const stats = [
  { value: 0, label: "🙋 Attend" },
  { value: 0, label: "🤒 Sick" },
  { value: 0, label: "🏝️ Leave" },
  { value: 0, label: "🏙️ Out of City" },
];

export default function Summary() {
  // variables
  const { profile } = useAuth();
  return (
    <Card className="w-full lg:w-4/6 h-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <CardTitle>
            <span className="font-semibold text-2xl md:text-3xl lg:text-4xl">
              Hello, {profile?.name ?? "-"}👋
            </span>
          </CardTitle>
          <Badge variant={"outline"} className="w-fit capitalize">
            <span className="text-primary">•</span> {profile?.role?.name ?? "-"}
          </Badge>
        </div>
        <CardDescription>
          Empower your team with seamless control over user roles, permissions,
          and HR insights at your fingertips.
        </CardDescription>
      </CardHeader>
      <div className="flex items-center gap-2 w-full overflow-x-auto mt-4">
        <CardReminder
          client="PT Cinta Sejati"
          date="17 April 2025"
          status="Payment Not Processed"
        />
        <CardReminder
          client="PT Cinta Sejati"
          date="17 April 2025"
          status="Payment Not Processed"
        />
      </div>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-center justify-between">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-2 rounded-lg"
          >
            <h2 className="text-xl md:text-3xl font-semibold">{stat.value}</h2>
            <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <ChartSummary />
      </CardFooter>
    </Card>
  );
}
