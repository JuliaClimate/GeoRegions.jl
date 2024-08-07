"""
    tableGeoRegions(; onlycustom::Bool) -> nothing

Display all available GeoRegions in tabular format.

Keyword Arguments
=================

- `onlycustom` : If true, only custom, user-defined GeoRegions will be displayed. To show all available GeoRegions (including predefined GeoRegions), set `onlycustom` to `false`
"""
function tableGeoRegions(;
    path :: AbstractString = geodir,
    onlycustom :: Bool = false
)

    flist = ["rectlist.txt","polylist.txt","tiltlist.txt"]
    fdefined = vcat(flist,"giorgi.txt","srex.txt","ar6.txt")

    regvec  = []
    filevec = []
    typevec = []

    for fname in flist
        copygeoregions(fname,path)
        rvec,rtype = listgeoregions(joinpath(path,fname))
        regvec = vcat(regvec,rvec)
        nreg = length(rvec)
        fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
        tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
    end

    if !onlycustom
        for fname in fdefined
            copygeoregions(fname,geodir)
            rvec,rtype = listgeoregions(joinpath(geodir,fname))
            regvec = vcat(regvec,rvec)
            nreg = length(rvec)
            fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
            tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
        end
    end

    ngeo = size(regvec,1)
    fmat = Array{Any,2}(undef,ngeo,5)

    for igeo = 1 : ngeo
        geo = getgeoregion(
            regvec[igeo],
            joinpath(geodir,filevec[igeo]),
            typevec[igeo]
        )

        fmat[igeo,1] = geo.ID
        fmat[igeo,2] = typevec[igeo]
        fmat[igeo,3] = geo.name
        fmat[igeo,4] = geo.pID
        fmat[igeo,5] = filevec[igeo]

    end

    head = ["ID","Type","Name","Parent","File"];

    pretty_table(
        fmat,header=head,
        alignment=[:c,:c,:l,:c,:c],
        crop = :none, tf = tf_compact
    );

    return nothing

end

"""
    tableGeoRegions(fname::AbstractString) -> nothing

Display all available GeoRegions in tabular format.

Keyword Arguments
=================

- `onlycustom` : If true, only custom, user-defined GeoRegions will be displayed. To show all available GeoRegions (including predefined GeoRegions), set `onlycustom` to `false`
"""
function tableGeoRegions(
    fname::AbstractString
)

    rvec,rtype = listgeoregions(fname)
    ngeo = size(rvec,1)
    fmat = Array{Any,2}(undef,ngeo,5)

    for igeo = 1 : ngeo
        g = getgeoregion(rvec[igeo],fname,rtype)
        fmat[igeo,1] = g.ID
        fmat[igeo,2] = rtype
        fmat[igeo,3] = g.name
        fmat[igeo,4] = g.pID
        fmat[igeo,5] = basename(fname)
    end

    head = ["ID","Type","Name","Parent","File"];

    pretty_table(
        fmat,header=head,
        alignment=[:c,:c,:l,:c,:c],
        crop = :none, tf = tf_compact
    );

    return nothing

end

"""
    tableRectRegions(;
        custom :: Bool = true,
        giorgi :: Bool = false
    ) -> nothing

Display all available RectRegions in tabular format.

Keyword Arguments
=================

- `custom` : If true, display custom user-defined GeoRegions. Default is `true`
- `giorgi` : If true, display Giorgi predefined GeoRegions. Default is `false`
"""
function tableRectRegions(;
    path :: AbstractString = geodir,
    custom :: Bool = true,
    giorgi :: Bool = false
)

    regvec  = []
    filevec = []
    typevec = []

    if custom
        copygeoregions("rectlist.txt",path)
        rvec,rtype = listgeoregions(joinpath(path,"rectlist.txt"))
        regvec = vcat(regvec,rvec)
        nreg = length(rvec)
        fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
        tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
    end

    if giorgi
        copygeoregions("giorgi.txt",geodir)
        rvec,rtype = listgeoregions(joinpath(geodir,"giorgi.txt"))
        regvec = vcat(regvec,rvec)
        nreg = length(rvec)
        fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
        tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
    end

    ngeo = size(regvec,1)
    fmat = Array{Any,2}(undef,ngeo,5)

    for igeo = 1 : ngeo
        geo = getgeoregion(
            regvec[igeo],
            joinpath(geodir,filevec[igeo]),
            typevec[igeo]
        )

        fmat[igeo,1] = geo.ID
        fmat[igeo,2] = typevec[igeo]
        fmat[igeo,3] = geo.name
        fmat[igeo,4] = geo.pID
        fmat[igeo,5] = filevec[igeo]

    end

    head = ["ID","Type","Name","Parent","File"];

    pretty_table(
        fmat,header=head,
        alignment=[:c,:c,:l,:c,:c],
        crop = :none, tf = tf_compact
    );

    return nothing

end

"""
    tablePolyRegions(;
        custom :: Bool = true,
        srex :: Bool = false,
        ar6  :: Bool = false
    ) -> nothing

Display all available PolyRegions in tabular format.

Keyword Arguments
=================

- `custom` : If true, display custom user-defined GeoRegions. Default is `true`
- `srex` : If true, display SREX predefined GeoRegions. Default is `false`
- `ar6` : If true, display IPCC AR6 predefined GeoRegions. Default is `false`
"""
function tablePolyRegions(;
    path :: AbstractString = geodir,
    custom :: Bool = true,
    srex :: Bool = false,
    ar6  :: Bool = false
)
    
    regvec  = []
    filevec = []
    typevec = []

    if custom
        copygeoregions("polylist.txt",path)
        rvec,rtype = listgeoregions(joinpath(path,"polylist.txt"))
        regvec = vcat(regvec,rvec)
        nreg = length(rvec)
        fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
        tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
    end

    if srex
        copygeoregions("srex.txt",geodir)
        rvec,rtype = listgeoregions(joinpath(path,"srex.txt"))
        regvec = vcat(regvec,rvec)
        nreg = length(rvec)
        fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
        tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
    end

    if ar6
        copygeoregions("ar6.txt",geodir)
        rvec,rtype = listgeoregions(joinpath(path,"ar6.txt"))
        regvec = vcat(regvec,rvec)
        nreg = length(rvec)
        fvec = fill(fname,nreg); filevec = vcat(filevec,fvec)
        tvec = fill(rtype,nreg); typevec = vcat(typevec,tvec)
    end

    ngeo = size(regvec,1)
    fmat = Array{Any,2}(undef,ngeo,5)

    for igeo = 1 : ngeo
        geo = getgeoregion(
            regvec[igeo],
            joinpath(path,filevec[igeo]),
            typevec[igeo]
        )

        fmat[igeo,1] = geo.ID
        fmat[igeo,2] = typevec[igeo]
        fmat[igeo,3] = geo.name
        fmat[igeo,4] = geo.pID
        fmat[igeo,5] = filevec[igeo]

    end

    head = ["ID","Type","Name","Parent","File"];

    pretty_table(
        fmat,header=head,
        alignment=[:c,:c,:l,:c,:c],
        crop = :none, tf = tf_compact
    );

    return nothing

end