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

const stats = [
  { value: 80, label: "🙋 Attend" },
  { value: 80, label: "🤒 Sick" },
  { value: 80, label: "🏝️ Leave" },
  { value: 80, label: "🏙️ Out of City" },
];

export default function Summary() {
  return (
    <Card className="w-full lg:w-4/6 h-full rounded-3xl !p-2">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <CardTitle>
            <span className="font-semibold text-2xl md:text-3xl lg:text-4xl">
              Hello, Putri Ayu👋
            </span>
          </CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Super Admin
          </Badge>
        </div>
        <CardDescription>
          Empower your team with seamless control over user roles, permissions,
          and HR insights at your fingertips.
        </CardDescription>
      </CardHeader>
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
