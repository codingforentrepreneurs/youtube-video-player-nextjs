export default function TimeBucketSelector({ bucket, setBucket, bucketUnit, setBucketUnit }) {
    // Define bucket unit options with separate label and value
    const bucketUnitOptions = [
        { value: "seconds", label: "Seconds" },
        { value: "minutes", label: "Minutes" },
        { value: "hours", label: "Hours" },
        { value: "days", label: "Days" },
        { value: "weeks", label: "Weeks" },
        { value: "months", label: "Months" },
        { value: "years", label: "Years" }
    ];

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex gap-2">
                <input 
                    type="number" 
                    id="bucket" 
                    name="bucket"
                    value={bucket}
                    min="1"
                    onChange={(e) => setBucket(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-24 text-right"
                    placeholder="Size"
                />
                <select
                    id="bucketUnit"
                    name="bucketUnit"
                    value={bucketUnit}
                    onChange={(e) => setBucketUnit(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-32"
                >
                    {bucketUnitOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}