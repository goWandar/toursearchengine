"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/recipes/tabs/tabs";
import { Button } from "@/recipes/button/button";
import ParksTabContent from "./parks-tab-content";
import AllTabContent from "./all-tab-content";

interface ResultsTabsProps {
    isLoading: boolean;
    searchItemType: string;
    searchItemName: string;
    searchItemId: number;
    searchParams?: URLSearchParams;
    totalResults: number;
    setTotalResults: (total: number) => void;
}

export default function ResultsTabs({
    searchItemType,
    searchItemName,
    searchItemId,
    searchParams,
    totalResults,
    setTotalResults,
}: ResultsTabsProps) {
    const [activeTab, setActiveTab] = useState("all");


    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border relative">
                {/* All Results tab */}
                <TabsTrigger value="all" asChild>
                    <div className="rounded-xl font-medium relative">
                        All Results {activeTab === "all" && `(${totalResults})`}
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

                {/* Parks tab */}
                {searchItemType === "country" && (
                    <TabsTrigger value="parks" className="rounded-xl font-medium relative">
                        Parks {activeTab === "parks" && `(${totalResults})`}
                        {activeTab === "parks" && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                title="View park insights"
                            >
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        )}
                    </TabsTrigger>
                )}

                {/* Experiences tab */}
                <TabsTrigger value="experiences" className="rounded-xl font-medium relative">
                    Experiences {activeTab === "experiences" && `(${totalResults})`}
                    {activeTab === "experiences" && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full shadow-sm"
                            title="View experience insights"
                        >
                            <Lightbulb className="h-4 w-4" />
                        </Button>
                    )}
                </TabsTrigger>
            </TabsList>

            {/* All Tours Tab Content */}
            <TabsContent value="all" className="space-y-12">
                <AllTabContent
                    searchParams={searchParams}
                    searchItemId={searchItemId}
                    searchItemType={searchItemType}
                    setTotalResults={setTotalResults}
                />
            </TabsContent>

            {/* Parks Tab Content */}
            <TabsContent value="parks" className="space-y-12">
                {/* Parks */}
                <ParksTabContent countryName={searchItemName} setTotalResults={setTotalResults} />
            </TabsContent>
        </Tabs>
    );
}
