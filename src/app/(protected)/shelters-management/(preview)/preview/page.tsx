import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { IoGrid } from "react-icons/io5";

export default function ShelterProfilePage() {
  // Example shelter data - would be fetched from database in a real implementation
  const shelter = {
    id: "1",
    name: "Happy Paws Shelter",
    username: "happypaws.shelter",
    description:
      "A safe haven for abandoned animals looking for their forever homes. Providing care and finding forever homes since 2015.",
    website: "www.happypawsshelter.com",
    imageUrl: "/path/to/shelter-image.jpg", // Replace with actual image path
    statistics: {
      posts: 261,
      followers: 883,
      following: 288,
    },
    followedBy: ["bugsbunny", "donaldduck", "5 more"],
    admins: [
      { id: "1", name: "John Doe", role: "Owner" },
      { id: "2", name: "Jane Smith", role: "Manager" },
    ],
    photos: [
      "/path/to/photo1.jpg",
      "/path/to/photo2.jpg",
      "/path/to/photo3.jpg",
      "/path/to/photo4.jpg",
      "/path/to/photo5.jpg",
      "/path/to/photo6.jpg",
    ],
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col w-full bg-white min-h-screen p-4">
        {/* Header with back button and username */}

        {/* Profile Info Section */}
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Profile Picture */}
            <Avatar className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 border-2 border-white">
              <AvatarImage src={shelter.imageUrl} alt={shelter.name} />
              <AvatarFallback>{shelter.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Stats */}
            <div className="flex-1 flex justify-around mt-4 md:mt-0 md:ml-8 w-full md:w-auto">
              <div className="text-center px-4">
                <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                  {shelter.statistics.posts}
                </p>
                <p className="text-xs md:text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center px-4">
                <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                  {shelter.statistics.followers}
                </p>
                <p className="text-xs md:text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center px-4">
                <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                  {shelter.statistics.following}
                </p>
                <p className="text-xs md:text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>

          {/* Name and Bio */}
          <div className="mt-5 md:mt-8 max-w-3xl">
            <h2 className="font-semibold text-base md:text-lg">
              {shelter.name}
            </h2>
            <p className="text-sm md:text-base mt-2 leading-tight">
              {shelter.description}
            </p>
            <Link
              href={`https://${shelter.website}`}
              className="text-sm md:text-base text-blue-600"
            >
              {shelter.website}
            </Link>
          </div>

          {/* Followed by section */}
          <div className="mt-3 text-xs md:text-sm">
            <span className="text-gray-500">Followed by </span>
            {shelter.followedBy.map((follower, index) => (
              <span key={index} className="font-semibold">
                {follower}
                {index < shelter.followedBy.length - 1 && ", "}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 md:mt-6">
            <Button
              variant="default"
              className="flex-1 h-10 md:h-11 bg-blue-500 hover:bg-blue-600"
            >
              Follow
            </Button>
            <Button variant="outline" className="flex-1 h-10 md:h-11">
              Message
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 md:h-11 w-10 md:w-11"
            >
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 8.5l-5-5-5 5M17 15.5l-5 5-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Content Categories */}
        <div className="p-4 md:p-6 lg:p-8 border-t max-w-5xl mx-auto w-full">
          <div className="flex justify-around md:justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                className="w-16 h-16 md:w-20 md:h-20 rounded-md bg-gray-100 flex items-center justify-center mb-2"
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </Button>
              <span className="text-xs md:text-sm">Animals</span>
            </div>
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                className="w-16 h-16 md:w-20 md:h-20 rounded-md bg-gray-100 flex items-center justify-center mb-2"
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </Button>
              <span className="text-xs md:text-sm">Locations</span>
            </div>
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                className="w-16 h-16 md:w-20 md:h-20 rounded-md bg-gray-100 flex items-center justify-center mb-2"
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </Button>
              <span className="text-xs md:text-sm">Events</span>
            </div>
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                className="w-16 h-16 md:w-20 md:h-20 rounded-md bg-gray-100 flex items-center justify-center mb-2"
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </Button>
              <span className="text-xs md:text-sm">Donations</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="border-t max-w-7xl mx-auto w-full">
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-transparent h-12 border-b">
              <TabsTrigger
                value="grid"
                className="data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none"
              >
                <IoGrid className="h-5 w-5 md:h-6 md:w-6" />
              </TabsTrigger>
              <TabsTrigger
                value="tagged"
                className="data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-3 gap-1">
                {shelter.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-200 relative"
                  >
                    <Image
                      src={photo}
                      alt={`Shelter photo ${index + 1}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 33vw, 200px"
                      // Using placeholder instead of onError since Image component doesn't support onError
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob3RvPC90ZXh0Pjwvc3ZnPg=="
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="tagged"
              className="flex items-center justify-center h-40 text-center p-4"
            >
              <div>
                <p className="text-lg font-semibold">No Tagged Posts</p>
                <p className="text-sm text-gray-500">
                  When people tag this shelter in posts, they&apos;ll appear
                  here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Navigation */}
        {/* <div className="mt-auto border-t flex justify-between items-center p-4">
        <button className="flex flex-col items-center justify-center">
          <IoHome className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <IoSearch className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <IoAdd className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <IoHeart className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src={shelter.imageUrl} />
            <AvatarFallback>{shelter.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </div> */}
      </div>
    </div>
  );
}
