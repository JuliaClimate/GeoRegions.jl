import{_ as s,c as a,o as n,a7 as i}from"./chunks/framework.Bu--eeyr.js";const N=JSON.parse('{"title":"Extracting Gridded Data using RegionGrid","description":"","frontmatter":{},"headers":[],"relativePath":"using/extract.md","filePath":"using/extract.md","lastUpdated":null}'),e={name:"using/extract.md"},p=i(`<h1 id="Extracting-Gridded-Data-using-RegionGrid" tabindex="-1">Extracting Gridded Data using RegionGrid <a class="header-anchor" href="#Extracting-Gridded-Data-using-RegionGrid" aria-label="Permalink to &quot;Extracting Gridded Data using RegionGrid {#Extracting-Gridded-Data-using-RegionGrid}&quot;">​</a></h1><p>Suppose we have Global Data. However, we are only interested in a specific region (say, the North Central American region as defined in AR6), how do we extract data for this region?</p><p>The simple answer is, we use the <code>extractGrid()</code> function, which takes in a <code>RegionGrid</code> and a data array, and returns a new data array for the GeoRegion.</p><h3 id="setup" tabindex="-1">Setup <a class="header-anchor" href="#setup" aria-label="Permalink to &quot;Setup&quot;">​</a></h3><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> GeoRegions</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DelimitedFiles</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CairoMakie</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">download</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://raw.githubusercontent.com/natgeo-wong/GeoPlottingData/main/coastline_resl.txt&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coast.cst&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">coast </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> readdlm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coast.cst&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,comments</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">clon  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> coast[:,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">clat  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> coast[:,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span></span></code></pre></div><h2 id="Let-us-define-the-GeoRegion-of-interest" tabindex="-1">Let us define the GeoRegion of interest <a class="header-anchor" href="#Let-us-define-the-GeoRegion-of-interest" aria-label="Permalink to &quot;Let us define the GeoRegion of interest {#Let-us-define-the-GeoRegion-of-interest}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">geo  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> GeoRegion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;AR6_NCA&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>The Polygonal Region AR6_NCA has the following properties:</span></span>
<span class="line"><span>    Region ID    (ID) : AR6_NCA</span></span>
<span class="line"><span>    Parent ID   (pID) : GLB</span></span>
<span class="line"><span>    Name       (name) : Northern Central America</span></span>
<span class="line"><span>    Bounds  (N,S,E,W) : [33.8, 16.0, -90.0, -122.5]</span></span>
<span class="line"><span>    Shape     (shape) : Point{2, Float64}[[-90.0, 25.0], [-104.5, 16.0], [-122.5, 33.8], [-105.0, 33.8], [-90.0, 25.0]]</span></span>
<span class="line"><span>        (is180,is360) : (true, false)</span></span></code></pre></div><p>We also define some sample test data in the global domain</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lon </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> collect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">360</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">pop!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(lon); nlon </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(lon)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lat </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> collect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);           nlat </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(lat)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">odata </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> randn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((nlon,nlat))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>360×181 Matrix{Float64}:</span></span>
<span class="line"><span> -1.51976    -1.06822    -0.278088  …   0.59697   -0.20973    -0.745463</span></span>
<span class="line"><span> -0.403299   -0.896384    0.816051     -1.89436   -1.65855    -0.332974</span></span>
<span class="line"><span> -1.81926    -0.213213   -0.81391      -0.183246  -0.918719    1.49813</span></span>
<span class="line"><span>  0.583592   -0.172523   -0.422288      0.18205   -0.983444    0.744753</span></span>
<span class="line"><span> -0.504937    0.280976   -0.630778      0.408336   1.40066    -0.799867</span></span>
<span class="line"><span>  0.558553    0.910825   -0.288495  …   0.139085  -0.144804   -0.240572</span></span>
<span class="line"><span>  1.44393    -0.0255517  -1.55021       0.893512   0.393987   -2.50504</span></span>
<span class="line"><span>  0.0978337   0.16897    -1.7596        0.878473  -0.348726    0.1108</span></span>
<span class="line"><span> -0.332354    0.560503   -1.45781      -0.591802  -0.715092   -0.0256041</span></span>
<span class="line"><span> -0.622193   -0.439036   -1.95156      -0.61665    1.3697     -1.58663</span></span>
<span class="line"><span>  ⋮                                 ⋱                          ⋮</span></span>
<span class="line"><span> -0.0786834   2.13953    -0.640613      0.394866   0.0252424   0.541481</span></span>
<span class="line"><span>  0.299301    2.6579      2.18695       0.240713  -0.654727    0.110688</span></span>
<span class="line"><span> -0.73747     1.14662     1.59476       1.17603    0.787565    1.05738</span></span>
<span class="line"><span>  1.33979    -0.554504   -0.98539      -1.00126   -0.932451    1.1819</span></span>
<span class="line"><span>  0.150993   -1.30876    -0.129291  …  -1.58184   -1.79163     0.316504</span></span>
<span class="line"><span>  0.123113   -0.641158   -0.400491      1.7714    -0.0163741  -0.620367</span></span>
<span class="line"><span> -0.371605    0.338166   -0.210448      0.47999   -0.626191   -0.513311</span></span>
<span class="line"><span> -0.74809     1.05948    -1.17533      -1.04159    0.753299    0.188394</span></span>
<span class="line"><span>  0.451286   -0.776093    0.011729      1.25357   -0.671143   -0.195252</span></span></code></pre></div><p>Our next step is to define the RegionGrid based on the longitude and latitude vectors and their intersection with the GeoRegion</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ggrd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> RegionGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(geo,lon,lat)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>The Polygonal Grid has the following properties:</span></span>
<span class="line"><span>    Grid Bounds       (grid) : [124, 107, 271, 239]</span></span>
<span class="line"><span>    Longitude Indices (ilon) : [239, 240, 241, 242, 243, 244, 245, 246, 247, 248  …  262, 263, 264, 265, 266, 267, 268, 269, 270, 271]</span></span>
<span class="line"><span>    Latitude Indices  (ilat) : [107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]</span></span>
<span class="line"><span>    Longitude Points   (lon) : [-122.0, -121.0, -120.0, -119.0, -118.0, -117.0, -116.0, -115.0, -114.0, -113.0  …  -99.0, -98.0, -97.0, -96.0, -95.0, -94.0, -93.0, -92.0, -91.0, -90.0]</span></span>
<span class="line"><span>    Latitude Points    (lat) : [16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0]</span></span>
<span class="line"><span>    Region Size (nlon * nlat) : 33 lon points x 18 lat points</span></span>
<span class="line"><span>    Region Mask (sum(mask) / (nlon * nlat)) : 281 / 594</span></span></code></pre></div><p>Then we extract the data</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ndata </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> extractGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(odata,ggrd)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>33×18 Matrix{Float64}:</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN         …  NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN            0.265381</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN          -0.224422     0.567931</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN              1.67151     0.0993618    0.778459</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN              0.163252   -0.644675    -1.14833</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN         …   -1.43777     0.514898     0.791617</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN             -0.702647    0.32758     -0.726071</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN             -0.379183    1.83802      0.239722</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN              0.347784    0.0311085   -0.482691</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN             -0.588135    2.95287      0.680521</span></span>
<span class="line"><span>   ⋮                        ⋮         ⋱    ⋮                      </span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN    0.554907     NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN    1.17125   …  NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN         …  NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN          NaN</span></span>
<span class="line"><span> NaN  NaN  NaN  NaN  NaN  NaN            NaN         NaN          NaN</span></span></code></pre></div><p>Let us plot the old and new data</p><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fig = Figure()</span></span>
<span class="line"><span>_,_,slon,slat = coordGeoRegion(geo); slon = slon</span></span>
<span class="line"><span>aspect = (maximum(slon)-minimum(slon))/(maximum(slat)-minimum(slat))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ax = Axis(</span></span>
<span class="line"><span>    fig[1,1],width=350,height=350/aspect,</span></span>
<span class="line"><span>    limits=(minimum(slon)-2+360,maximum(slon)+2+360,minimum(slat)-2,maximum(slat)+2)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>contourf!(</span></span>
<span class="line"><span>    ax,lon,lat,odata,</span></span>
<span class="line"><span>    levels=range(-1,1,length=11),extendlow=:auto,extendhigh=:auto</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>lines!(ax,clon,clat,color=:black)</span></span>
<span class="line"><span>lines!(ax,slon.+360,slat.+360,color=:red,linewidth=5)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ax = Axis(</span></span>
<span class="line"><span>    fig[1,2],width=350,height=350/aspect,</span></span>
<span class="line"><span>    limits=(minimum(slon)-2,maximum(slon)+2,minimum(slat)-2,maximum(slat)+2)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>contourf!(</span></span>
<span class="line"><span>    ax,ggrd.lon,ggrd.lat,ndata,</span></span>
<span class="line"><span>    levels=range(-1,1,length=11),extendlow=:auto,extendhigh=:auto</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>lines!(ax,clon,clat,color=:black)</span></span>
<span class="line"><span>lines!(ax,slon,slat,color=:red,linewidth=5)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hideydecorations!(ax, ticks = false,grid=false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>resize_to_layout!(fig)</span></span>
<span class="line"><span>fig</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="GeoRegions.extractGrid" href="#GeoRegions.extractGrid">#</a> <b><u>GeoRegions.extractGrid</u></b> — <i>Function</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">extractGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    odata </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> AbstractArray{&lt;:Real,N}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ggrd  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> RegionGrid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> N </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Array{</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Real</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,N}</span></span></code></pre></div><p>Extracts data from odata, an Array of dimension N (where N ∈ 2,3,4) that contains data of a Parent <code>GeoRegion</code>, into another Array of dimension N, containing <em><strong>only</strong></em> within a sub <code>GeoRegion</code> we are interested in.</p><div class="warning custom-block"><p class="custom-block-title">Warning</p><p>Please ensure that the 1st dimension is longitude and 2nd dimension is latitude before proceeding. The order of the 3rd and 4th dimensions (when used), however, is not significant.</p></div><p><strong>Arguments</strong></p><ul><li><p><code>odata</code> : An array of dimension N containing gridded data in the region we are interesting in extracting from</p></li><li><p><code>ggrd</code> : A <code>RegionGrid</code> containing detailed information on what to extract</p></li></ul><p><a href="https://github.com/JuliaClimate/GeoRegions.jl/blob/3f3374ce9067f9982b6cc0e1556f50ba05187b16/src/extract/grid.jl#L1-L16" target="_blank" rel="noreferrer">source</a></p></div><br><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="GeoRegions.extractGrid!" href="#GeoRegions.extractGrid!">#</a> <b><u>GeoRegions.extractGrid!</u></b> — <i>Function</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">extractGrid!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    odata </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> AbstractArray{&lt;:Real,N}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ndata </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> AbstractArray{&lt;:Real,N}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ggrd  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> RegionGrid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> N </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nothing</span></span></code></pre></div><p>Extracts data from odata, an Array of dimension N (where N ∈ 2,3,4) that contains data of a Parent <code>GeoRegion</code>, into ndata, another Array of dimension N, containing <em><strong>only</strong></em> within a sub <code>GeoRegion</code> we are interested in.</p><p>This allows for iterable in-place modification to save memory space and reduce allocations if the dimensions are fixed.</p><div class="warning custom-block"><p class="custom-block-title">Warning</p><p>Please ensure that the 1st dimension is longitude and 2nd dimension is latitude before proceeding. The order of the 3rd and 4th dimensions (when used), however, is not significant.</p></div><p><strong>Arguments</strong></p><ul><li><p><code>odata</code> : An array of dimension N containing gridded data in the region we are interesting in extracting from</p></li><li><p><code>ndata</code> : An array of dimension N meant as a placeholder for the extracted data to minimize allocations</p></li><li><p><code>ggrd</code> : A <code>RegionGrid</code> containing detailed information on what to extract</p></li></ul><p><a href="https://github.com/JuliaClimate/GeoRegions.jl/blob/3f3374ce9067f9982b6cc0e1556f50ba05187b16/src/extract/grid.jl#L33-L52" target="_blank" rel="noreferrer">source</a></p></div><br><hr><p><em>This page was generated using <a href="https://github.com/fredrikekre/Literate.jl" target="_blank" rel="noreferrer">Literate.jl</a>.</em></p>`,26),t=[p];function l(h,d,o,r,k,c){return n(),a("div",null,t)}const E=s(e,[["render",l]]);export{N as __pageData,E as default};
