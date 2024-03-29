# RegionGrid: Applying GeoRegions to Gridded Data

In this section, we go through the basic steps of creating a RegionGrid for `RectRegion`s and `PolyRegion`s.  See if you can spot the differences between the RegionGrids generated by the two different types.

### Setup

````@example regiongrid
using GeoRegions
using DelimitedFiles
using CairoMakie

download("https://raw.githubusercontent.com/natgeo-wong/GeoPlottingData/main/coastline_resl.txt","coast.cst")
coast = readdlm("coast.cst",comments=true)
clon  = coast[:,1]
clat  = coast[:,2]
nothing
````

## `RectGrid` Example

````@example regiongrid
geo  = GeoRegion("GF_SSA")
lon  = -180:5:180
lat  = -90:5:90
ggrd = RegionGrid(geo,lon[1:(end-1)],lat)
````

## `PolyGrid` Example

````@example regiongrid
geo  = GeoRegion("AR6_NWS")
lon  = -180:2:180;
lat  = -90:2:90;
ggrd = RegionGrid(geo,lon[1:(end-1)],lat)
````

So here, we see that in this `PolyGrid` example, the `RegionGrid` contains an additional field `mask` that, within the rectilinear longitude-latitude shape bounding the `GeoRegion` (because gridded data here is assumed to be rectilinear), the data is within the GeoRegion.  Values of `1` indicate it is within the GeoRegion, otherwise the values are `NaN.

````@example regiongrid
ggrd.mask
````

## The Mask of a `PolyGrid`

The `PolyGrid` type derived from a `PolyRegion` allows us to apply a mask to filter out data that is within the `shape` of a `PolyRegion` on a rectilinear lon-lat grid defined by the `bound` of a PolyRegion.  We consider the following example of an AR6 region over South Asia:

````@example regiongrid
geo  = GeoRegion("AR6_SAS")
lon  = -180:5:180;
lat  = -90:2:90;
ggrd = RegionGrid(geo,lon[1:(end-1)],lat)
````

And using the field mask, we plot the points that are in the region (blue), and out of the region (red).

````@example regiongrid
mask = ggrd.mask
grid = ones(size(mask))
inlon = grid .* ggrd.lon;  inlon = inlon[.!isnan.(mask)]
inlat = grid .* ggrd.lat'; inlat = inlat[.!isnan.(mask)]
otlon = grid .* ggrd.lon;  otlon = otlon[isnan.(mask)]
otlat = grid .* ggrd.lat'; otlat = otlat[isnan.(mask)]
blon,blat,slon,slat = coordGeoRegion(geo)

fig = Figure()
aspect = (maximum(slon)-minimum(slon))/(maximum(slat)-minimum(slat))
ax = Axis(
    fig[1,1],width=750,height=750/aspect,
    limits=(minimum(slon)-2,maximum(slon)+2,minimum(slat)-2,maximum(slat)+2)
)

lines!(ax,clon,clat,color=:black)
lines!(ax,blon,blat)
lines!(ax,slon,slat)
scatter!(ax,otlon,otlat)
scatter!(ax,inlon,inlat)

resize_to_layout!(fig)
fig
````

## API

```@docs
RegionGrid(::RectRegion,::Vector{<:Real},::Vector{<:Real})
RegionGrid(::GeoRegion,::Array{<:Real,2},::Array{<:Real,2})
```

---

*This page was generated using [Literate.jl](https://github.com/fredrikekre/Literate.jl).*

