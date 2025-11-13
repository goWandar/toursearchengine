"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/recipes/tabs/tabs";
import { Button } from "@/recipes/button/button";
import ParksTabContent from "./parks-tab-content";
import AllTabContent from "./all-tab-content";
import { useToursStore } from "@/stores/useTourStore";
import { tourSearchUrlHandler } from "@/utils/mordern-search.utils";
import { TabsListSkeleton } from "./tabs-list-skeleton";
import SafariCardSkeleton from "./safari-card-skeleton";
import { useRouter } from "next/navigation";

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
    const [activeTab, setActiveTab] = useState<"all" | "parks" | "experiences" | null>(null);
    const tabFromUrl = searchParams.get("tab");

    // Get type and id from URL (for all results tab)
    const typeInURL = searchParams?.get("type") ?? "";
    const idInURL = Number(searchParams?.get("id")) || 0;

    // Get Park from URL (for parks tab)
    const parkIdFromURL = Number(searchParams?.get("park")) || 0;

    // Tours Store States
    const pagination = useToursStore((state) => state.pagination);
    const isLoading = useToursStore((state) => state.isLoading);

    // Check URL params on mount to set active results tab
    useEffect(() => {
        if (tabFromUrl === "parks" && typeInURL === "country") {
            setActiveTab("parks");
        } else if (tabFromUrl === "experiences") {
            setActiveTab("experiences");
        } else {
            setActiveTab("all");
        }
    }, [tabFromUrl, typeInURL]);

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
                        <TabsTrigger value="all" asChild disabled={isLoading}>
                            <div className="rounded-xl font-medium relative">
                                All Results {(activeTab === "all" && pagination.total > 0) && `(${pagination.total})`}
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
                        {typeInURL === "country" && (
                            <TabsTrigger value="parks" className="rounded-xl font-medium relative" disabled={isLoading}>
                                Parks {(activeTab === "parks" && pagination.total > 0) && `(${pagination.total})`}
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
                        <TabsTrigger value="experiences" className="rounded-xl font-medium relative" disabled={isLoading}>
                            Experiences {(activeTab === "experiences" && pagination.total > 0) && `(${pagination.total})`}
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
                            typeInURL={typeInURL} idInURL={idInURL} activeTab={activeTab}
                        />
                    </TabsContent>

                    {/* Parks Tab Content */}
                    <TabsContent value="parks" className="space-y-12">
                        {/* Parks */}
                        <ParksTabContent searchParams={searchParams} countryName={searchItemName}
                            tabFromUrl={activeTab} setSearchItemId={setSearchItemId} setSearchItemType={setSearchItemType}
                            parkIdFromURL={parkIdFromURL} activeTab={activeTab}
                        />
                    </TabsContent>
                </Tabs>
            }
        </>
    );
}
