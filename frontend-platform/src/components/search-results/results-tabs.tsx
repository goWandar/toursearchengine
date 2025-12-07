"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/recipes/tabs/tabs";
import { Button } from "@/recipes/button/button";
import ParksTabContent from "./parks-tab-content";
import AllTabContent from "./all-tab-content";
import { useToursStore } from "@/stores/useTourStore";
import { TabsListSkeleton } from "./tabs-list-skeleton";
import SafariCardSkeleton from "./safari-card-skeleton";
import { ActiveTabType } from "@/types/free-search.types";
import ExperiencesTabContent from "./experiences-tab-content";

interface ResultsTabsProps {
    searchItemName: string;
    searchParams: URLSearchParams;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
}

export default function ResultsTabs({
    searchItemName,
    searchParams,
    setSearchItemId,
    setSearchItemType,
}: ResultsTabsProps) {
    const [activeTab, setActiveTab] = useState<ActiveTabType | null>(null);
    const tabFromUrl = searchParams.get("tab");

    // Get destination type and id from URL (for all results tab)
    const destinationTypeInUrl = searchParams?.get("type") ?? "";
    const destinationIdInUrl = Number(searchParams?.get("id")) || 0;

    // Get Park from URL (for parks tab)
    const parkIdInUrl = Number(searchParams?.get("park")) || 0;

    // Get Experience from URL (for experiences tab)
    const experienceIdInUrl = Number(searchParams?.get("experience")) || 0;

    // Tours Store States
    const pagination = useToursStore((state) => state.pagination);
    const resultsState = useToursStore((state) => state.resultsState);

    // Check set results tab based on URL "tab" param
    useEffect(() => {
        // Set Tab to Parks
        if (tabFromUrl === "parks" && destinationTypeInUrl === "country") {
            setActiveTab("parks");
        }
        // Set Tab to Experiences 
        else if (tabFromUrl === "experiences") {
            setActiveTab("experiences");
        }
        // Set Tab to "all" Results
        else {
            setActiveTab("all");
        }
    }, [tabFromUrl, destinationTypeInUrl]);

    return (
        <>
            {!activeTab ?
                <>
                    <TabsListSkeleton />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {
                            Array.from({ length: 12 }).map((_, i) => <SafariCardSkeleton key={i} />)
                        }
                    </div>
                </> :

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "parks" | "experiences")} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border relative">
                        {/* All Results tab */}
                        <TabsTrigger value="all" asChild disabled={resultsState === "loading"}>
                            <div className="rounded-xl text-xs sm:text-sm font-medium relative">
                                All Results <span className="hidden md:block">{(activeTab === "all" && pagination.total > 0) && `(${pagination.total})`}</span>
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
                        {destinationTypeInUrl === "country" && (
                            <TabsTrigger value="parks" className="rounded-xl text-xs sm:text-sm font-medium relative" disabled={resultsState === "loading"}>
                                Parks <span className="hidden sm:block">{(activeTab === "parks" && pagination.total > 0) && `(${pagination.total})`}</span>
                                {activeTab === "parks" && (
                                    <Button size="sm" variant="ghost"
                                        className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                        title="View park insights">
                                        <Lightbulb className="h-4 w-4" />
                                    </Button>
                                )}
                            </TabsTrigger>
                        )}

                        {/* Experiences tab */}
                        <TabsTrigger value="experiences" className="rounded-xl text-xs sm:text-sm font-medium relative" disabled={resultsState === "loading"}>
                            Experiences <span className="hidden sm:block">{(activeTab === "experiences" && pagination.total > 0) && `(${pagination.total})`}</span>
                            {activeTab === "experiences" && (
                                <Button size="sm" variant="ghost"
                                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full shadow-sm"
                                    title="View experience insights">
                                    <Lightbulb className="h-4 w-4" />
                                </Button>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* All Tours Tab Content */}
                    <TabsContent value="all" className="space-y-12">
                        <AllTabContent searchParams={searchParams}
                            setSearchItemId={setSearchItemId} setSearchItemType={setSearchItemType}
                            destinationTypeInUrl={destinationTypeInUrl} destinationIdInUrl={destinationIdInUrl} activeTab={activeTab}
                        />
                    </TabsContent>

                    {/* Parks Tab Content */}
                    <TabsContent value="parks" className="space-y-12">
                        <ParksTabContent searchParams={searchParams} countryName={searchItemName}
                            tabFromUrl={activeTab} setSearchItemId={setSearchItemId} setSearchItemType={setSearchItemType}
                            parkIdInUrl={parkIdInUrl} activeTab={activeTab}
                        />
                    </TabsContent>

                    {/* Experience Tab Content */}
                    <TabsContent value="experiences" className="space-y-12">
                        <ExperiencesTabContent
                            searchParams={searchParams} tabFromUrl={activeTab} setSearchItemId={setSearchItemId}
                            setSearchItemType={setSearchItemType} destinationIdInUrl={destinationIdInUrl}
                            destinationTypeInUrl={destinationTypeInUrl} activeTab={activeTab} experienceIdInUrl={experienceIdInUrl}
                        />
                    </TabsContent>
                </Tabs>
            }
        </>
    );
}
