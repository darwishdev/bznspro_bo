{
    $cmp: 'FormKit',
        props: {
        outerClass: "w-full",
            innerClass: "grid",
                type: 'dependentDropdown',
                    name: 'neighbourhoodId',
                        data: apiClient.placesInputList,
                            levels: {
            city: {
                label: "city",
                    placeholder: "city",
                        outerClass: 'col-12  md:col-4'
            },
            district: {
                label: "district",
                    placeholder: "district",
                        outerClass: 'col-12 md:col-4'
            },
            neighbourhood: {
                label: "Neighbourhood",
                    placeholder: "Neighbourhood",
                        outerClass: 'col-12   md:col-4'
            },
        },
        groupName: 'neighbourhoodId',

                }
},