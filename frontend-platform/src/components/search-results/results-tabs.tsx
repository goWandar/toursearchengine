"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/recipes/tabs/tabs";
import { Button } from "@/recipes/button/button";
import SafariCardSkeleton from "./safari-card-skeleton";
import ModernSafariCard from "./modern-safari-card";

interface ResultsTabsProps {
    paginationMeta: { total: number };
    tourResults: any[];
    isLoading: boolean;
}

export default function ResultsTabs({
    paginationMeta,
    tourResults,
    isLoading
}: ResultsTabsProps) {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border relative">
                <TabsTrigger value="all" asChild>
                    <div className="rounded-xl font-medium relative">
                        All Results ({paginationMeta.total})
                        {activeTab === "all" && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                title="View helpful insights"
                            >
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </TabsTrigger>

                {/* Repeat for other tabs */}
                <TabsTrigger value="someTab" asChild>
                    <div className="rounded-xl font-medium relative">Some Tab</div>
                </TabsTrigger>

                {/* <TabsTrigger value="parks" className="rounded-xl font-medium relative">
            Parks ({getTabResults("parks").length})
            {activeTab === "parks" && (
                <Button
                    onClick={scrollToInsights}
                    size="sm"
                    variant="ghost"
                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                    title="View park insights"
                >
                    <Lightbulb className="h-4 w-4" />
                </Button>
            )}
        </TabsTrigger> */}

                {/* <TabsTrigger value="experiences" className="rounded-xl font-medium relative">
            Experiences ({getTabResults("experiences").length})
            {activeTab === "experiences" && (
                <Button
                    onClick={scrollToInsights}
                    size="sm"
                    variant="ghost"
                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full shadow-sm"
                    title="View experience insights"
                >
                    <Lightbulb className="h-4 w-4" />
                </Button>
            )}
        </TabsTrigger> */}
            </TabsList>

            <TabsContent value="all" className="space-y-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {isLoading
                        ? Array.from({ length: 12 }).map((_, i) => (
                            <SafariCardSkeleton key={i} />
                        ))
                        : tourResults.map((tour) => (
                            <ModernSafariCard key={tour.id} data={tour} />
                        ))}
                </div>
                <div id="insights-section">
                    {/* <InsightsSection type="parks" subType="general" /> */}
                </div>
            </TabsContent>

            {/* <TabsContent value="parks" className="space-y-12">
          {searchedCountry && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex flex-wrap gap-2">
                      {parksByCountry[searchedCountry as keyof typeof parksByCountry]?.map((park) => (
                          <Badge
                              key={park}
                              variant="secondary"
                              className="cursor-pointer hover:bg-teal-100 hover:text-teal-700 transition-colors bg-gray-100 text-gray-700 rounded-full px-4 py-2"
                          >
                              {park}
                          </Badge>
                      ))}
                  </div>
              </div>
          )} 
      </TabsContent> */}
        </Tabs>
    );
}
